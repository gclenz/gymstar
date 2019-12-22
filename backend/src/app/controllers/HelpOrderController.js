import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrderController {
  async index(req, res) {
    const studentId = req.params.id;

    const helpOrders = await HelpOrder.findAll({
      where: { student_id: studentId },
    });

    const helpOrdersCount = await HelpOrder.count({
      where: { student_id: studentId },
    });

    if (helpOrdersCount === 0) {
      return res
        .status(200)
        .json({ message: "You don't have any help order yet." });
    }

    return res.json(helpOrders);
  }

  async store(req, res) {
    const studentId = req.params.id;

    const student = await Student.findByPk(studentId);

    // Check if student exists
    if (!student) {
      return res.status(401).json({ error: "This student doesn't exist." });
    }

    const { question } = req.body;

    const helpOrder = await HelpOrder.create({
      student_id: studentId,
      question,
    });

    return res.json(helpOrder);
  }
}

export default new HelpOrderController();
