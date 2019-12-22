import { Op } from 'sequelize';
import { lastDayOfWeek, startOfWeek, toDate } from 'date-fns';
import Checkin from '../models/Checkin';

class CheckInController {
  async index(req, res) {
    const studentId = req.params.id;

    const checkins = await Checkin.findAll({
      where: { student_id: studentId },
    });

    return res.json(checkins);
  }

  async store(req, res) {
    const studentId = req.params.id;

    const today = toDate(new Date().getTime());
    const weekFirstDay = startOfWeek(today, { weekStartsOn: 1 });
    const weekLastDay = lastDayOfWeek(today, { weekStartsOn: 1 });

    const checkins = await Checkin.count({
      where: {
        student_id: studentId,
        created_at: { [Op.between]: [weekFirstDay, weekLastDay] },
      },
    });

    // Check if student has more than 5 checkins in the same week
    if (checkins >= 5) {
      return res
        .status(400)
        .json({ error: 'You can only use the gym 5 times a week.' });
    }

    const checkin = await Checkin.create({
      student_id: studentId,
    });

    return res.json(checkin);
  }
}

export default new CheckInController();
