import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll();

    return res.json(plans);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      newTitle: Yup.string(),
      duration: Yup.number()
        .integer()
        .positive(),
      price: Yup.number().positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: "You should insert at least the plan's name." });
    }

    const plan = await Plan.findOne({ where: { title: req.body.title } });

    if (!plan) {
      return res.status(401).json({ error: "Plan doesn't exist." });
    }

    if (req.body.newTitle) {
      const planNameInUse = await Plan.findOne({
        where: { title: req.body.newTitle },
      });

      if (planNameInUse) {
        return res.status(401).json({ error: 'Plan already exist.' });
      }

      const { newTitle: title, duration, price } = req.body;

      await plan.update({
        title,
        duration,
        price,
      });

      return res.json(plan);
    }

    const updatedPlan = await plan.update(req.body, {
      where: { title: req.body.title },
    });

    // const updatedPlan = await Plan.update(
    //   {
    //     title,
    //     duration,
    //     price,
    //   },
    //   { where: { title: req.body.title } }
    // );

    return res.json(updatedPlan);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .integer()
        .positive()
        .required(),
      price: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'You should fill all fields.' });
    }

    const planExists = await Plan.findOne({ where: { title: req.body.title } });

    if (planExists) {
      return res.status(401).json({ error: 'Plan already exists.' });
    }

    const { title, price, duration } = req.body;

    const plan = await Plan.create({ title, price, duration });

    return res.json(plan);
  }

  async delete(req, res) {
    const planToDelete = req.body.title;

    const checkIfPlanExists = await Plan.findOne({
      where: { title: planToDelete },
    });

    if (!checkIfPlanExists) {
      return res.status(400).json({ error: "This plan doesn't exist." });
    }

    await Plan.destroy({
      where: { title: planToDelete },
    });

    return res.json({
      message: `The ${planToDelete} plan was successful deleted.`,
    });
  }
}

export default new PlanController();
