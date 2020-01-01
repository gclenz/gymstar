import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll();

    return res.json(plans);
  }

  async show(req, res) {
    const { id } = req.params;

    const plan = await Plan.findOne({
      where: { id },
    });

    res.json(plan);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
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

    const { id } = req.params;

    const plan = await Plan.findOne({ where: { id } });

    if (!plan) {
      return res.status(401).json({ error: "Plan doesn't exist." });
    }

    if (req.body.title !== plan.title) {
      const planNameInUse = await Plan.findOne({
        where: { title: req.body.title },
      });

      if (planNameInUse) {
        return res.status(401).json({ error: 'Plan name already in use.' });
      }
    }

    const updatedPlan = await plan.update(req.body, {
      where: { id },
    });

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
    const { id } = req.params;

    const plan = await Plan.findOne({
      where: { id },
    });

    if (!plan) {
      return res.status(400).json({ error: "This plan doesn't exist." });
    }

    await Plan.destroy({
      where: { id },
    });

    return res.json({
      message: `The ${plan.title} plan was successful deleted.`,
    });
  }
}

export default new PlanController();
