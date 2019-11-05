import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello world!' });
});

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
// Routes that require authorization
routes.get('/users', UserController.index);
routes.put('/users', UserController.update);

routes.get('/students', StudentController.index);
routes.put('/students', StudentController.update);
routes.post('/students', StudentController.store);

routes.get('/plans', PlanController.index);
// routes.get('/plans', PlanController.show);
routes.post('/plans', PlanController.store);

export default routes;
