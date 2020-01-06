import * as Yup from 'yup';
import { addMonths, parseISO } from 'date-fns';
import Plan from '../models/Plan';
import Enrollment from '../models/Enrollment';
import Student from '../models/Student';
import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';

class EnrollmentController {
  async index(req, res) {
    const enrollments = await Enrollment.findAll();

    return res.json(enrollments);
  }

  async show(req, res) {
    const { id } = req.params;

    const enrollment = await Enrollment.findOne({
      where: { id },
    });

    return res.json(enrollment);
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

    const student = await Student.findByPk(enrollmentData.studentId);

    // Check if student exists
    if (!student) {
      return res.status(401).json({ error: "This student doesn't exist." });
    }

    const plan = await Plan.findByPk(enrollmentData.planId);

    // Check if plan exists
    if (!plan) {
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

    // Send email to student
    await Queue.add(CancellationMail.key, {
      student,
      plan,
      endDate,
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
      newPlanId: Yup.number()
        .integer()
        .positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'You should fill all fields.' });
    }

    const { id } = req.params;

    const { newPlanId } = req.body;
    const enrollment = await Enrollment.findByPk(id);

    if (!enrollment) {
      return res.status(401).json({ error: "This enrollment doesn't exist." });
    }

    const plan = await Plan.findByPk(newPlanId);

    if (!plan) {
      return res.status(401).json({ error: "This plan doesn't exist." });
    }

    if (newPlanId === enrollment.plan_id) {
      return res.status(400).json({
        error: "You can't change enrollment's plan to the same one.",
      });
    }

    const newPrice =
      Number(enrollment.price) + Number(plan.price) * Number(plan.duration);

    const newEndDate = addMonths(enrollment.end_date, plan.duration);

    await enrollment.update({
      plan_id: newPlanId,
      price: newPrice,
      end_date: newEndDate,
    });

    return res.json(enrollment);
  }
}

export default new EnrollmentController();
