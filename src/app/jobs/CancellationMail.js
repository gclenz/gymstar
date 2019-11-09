import { format, parseISO } from 'date-fns';
import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { student, plan, endDate } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'New gym plan!',
      template: 'cancellation',
      context: {
        studentName: student.name,
        studentId: student.id,
        planName: plan.title,
        planEndDate: format(parseISO(endDate), "MMMM dd 'of' yyyy"),
      },
    });
  }
}

export default new CancellationMail();
