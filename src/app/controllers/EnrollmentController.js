import * as Yup from 'yup';
import { addMonths, parseISO } from 'date-fns';
import Plan from '../models/Plan';
import Enrollment from '../models/Enrollment';
import Student from '../models/Student';

class EnrollmentController {
  async index(req, res) {
    const enrollments = await Enrollment.findAll();

    return res.json(enrollments);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      studentId: Yup.number()
        .integer()
        .positive()
        .required(),
      planId: Yup.number()
        .integer()
        .positive()
        .required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'You should fill all fields.' });
    }

    const enrollmentData = req.body;

    // Check if student exists
    const studentExists = await Student.findByPk(enrollmentData.studentId);

    if (!studentExists) {
      return res.status(401).json({ error: "This student doesn't exist." });
    }

    const planExists = await Plan.findByPk(enrollmentData.planId);

    if (!planExists) {
      return res.status(401).json({ error: "This plan doesn't exist" });
    }

    const studentHasPlan = await Enrollment.findOne({
      where: { student_id: enrollmentData.studentId },
    });

    if (studentHasPlan) {
      return res.status(400).json({ error: 'This user already has a plan.' });
    }

    // Find plan to be used.
    const planData = await Plan.findByPk(enrollmentData.planId);

    // Converts Javascript timestamp to date.
    const startDate = parseISO(enrollmentData.date);

    // Calculates end date
    const endDate = addMonths(startDate, Number(planData.duration));

    const price = planData.price * planData.duration;

    const studentEnrollment = await Enrollment.create({
      student_id: enrollmentData.studentId,
      plan_id: enrollmentData.planId,
      start_date: startDate,
      end_date: endDate,
      price,
    });

    return res.json(studentEnrollment);
  }

  async delete(req, res) {
    const enrollment = await Enrollment.destroy({
      where: { id: req.body.enrollmentId },
    });

    if (!enrollment) {
      return res.status(400).json({ error: "This enrollment doesn't exist." });
    }

    return res.json({
      message: 'Enrollment deleted with success.',
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      enrollmentId: Yup.number()
        .integer()
        .positive()
        .required(),
      newEndDate: Yup.date(),
      newPrice: Yup.number().positive(),
      newPlanId: Yup.number()
        .integer()
        .positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'You should fill all fields.' });
    }

    const { newEndDate, newPlanId, newPrice } = req.body;
    const enrollment = await Enrollment.findByPk(req.body.enrollmentId);

    if (newEndDate === enrollment.end_date) {
      return res.status(400).json({
        error: "You can't change enrollment's expire date to the same one.",
      });
    }

    const planExists = await Plan.findByPk(newPlanId);

    if (!planExists) {
      return res.status(401).json({ error: "This plan doesn't exist." });
    }

    if (newPlanId === enrollment.plan_id) {
      return res.status(400).json({
        error: "You can't change enrollment's plan to the same one.",
      });
    }

    if (newPrice === enrollment.price) {
      return res.status(400).json({
        error: "You can't change enrollment's price to the same one.",
      });
    }

    await enrollment.update({
      plan_id: newPlanId,
      price: newPrice,
      end_date: newEndDate,
    });

    return res.json(enrollment);
  }
}

export default new EnrollmentController();
