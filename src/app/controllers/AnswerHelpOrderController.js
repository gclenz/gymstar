import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import Queue from '../../lib/Queue';
import HelpOrderAnswerMail from '../jobs/HelpOrderAnswerMail';

class AnswerHelpOrderController {
  async index(req, res) {
    const helpOrders = await HelpOrder.findAll({
      where: { answer: null },
    });

    return res.json(helpOrders);
  }

  async update(req, res) {
    const { answer } = req.body;

    const helpOrder = await HelpOrder.findByPk(req.params.id);

    // Check if question were already answered
    if (helpOrder.answer) {
      return res
        .status(401)
        .json({ error: 'This question is already answered.' });
    }

    const helpOrderAnswered = await HelpOrder.update(
      {
        answer,
        answered_at: new Date().getTime(),
      },
      {
        where: { id: req.params.id },
      }
    );

    const student = await Student.findOne({
      where: { id: helpOrder.student_id },
    });

    // Send email to student
    await Queue.add(HelpOrderAnswerMail.key, {
      student,
      question: helpOrder.question,
      answer,
    });

    return res.json(helpOrderAnswered);
  }
}

export default new AnswerHelpOrderController();
