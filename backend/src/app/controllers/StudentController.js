import * as Yup from 'yup';
import { Op } from 'sequelize';
import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    if (req.query.name) {
      const { name } = req.query;
      const student = await Student.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
      });

      return res.json(student);
    }

    const students = await Student.findAll();

    return res.json(students);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .integer()
        .positive()
        .required(),
      weight: Yup.number()
        .positive()
        .required(),
      height: Yup.number()
        .integer()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'You should fill all fields.' });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(401).json({ error: 'Student already exists.' });
    }

    const { name, email, age, weight, height } = req.body;

    const student = await Student.create({ name, email, age, weight, height });

    return res.json(student);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string()
        .email()
        .required(),
      newEmail: Yup.string().email(),
      age: Yup.number()
        .integer()
        .positive(),
      weight: Yup.number().positive(),
      height: Yup.number()
        .integer()
        .positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Validation failed.' });
    }

    // Check if student exists
    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (!studentExists) {
      return res.status(401).json({ error: 'Student not found.' });
    }

    const student = await Student.findOne({
      where: { email: req.body.email },
    });

    const { name, newEmail, age, weight, height } = req.body;

    const email = newEmail;

    const updatedData = await student.update({
      name,
      email,
      age,
      weight,
      height,
    });

    return res.json(updatedData);
  }

  async delete(req, res) {
    const { id } = req.params;

    const checkIfStudentExists = await Student.findOne({
      where: { id },
    });

    if (!checkIfStudentExists) {
      return res.status(400).json({ error: "This student doesn't exist." });
    }

    await Student.destroy({
      where: { id },
    });

    return res.json({
      message: `The student was successful deleted.`,
    });
  }
}

export default new StudentController();
