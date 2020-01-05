import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import AnswerHelpOrderController from './app/controllers/AnswerHelpOrderController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello world!' });
});

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.get('/students/:id', StudentController.show);
routes.get('/students/:id/checkins', CheckinController.index);
routes.post('/students/:id/checkins', CheckinController.store);

routes.get('/students/:id/helporders', HelpOrderController.index);
routes.post('/students/:id/helporders', HelpOrderController.store);

routes.use(authMiddleware);
// Routes that require authorization
routes.get('/users', UserController.index);
routes.put('/users', UserController.update);

routes.get('/students', StudentController.index);
routes.put('/students/:id', StudentController.update);
routes.post('/students', StudentController.store);
routes.delete('/students/:id', StudentController.delete);

routes.get('/plans', PlanController.index);
routes.get('/plans/:id', PlanController.show);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.get('/enrollments', EnrollmentController.index);
routes.post('/enrollments', EnrollmentController.store);
routes.put('/enrollments', EnrollmentController.update);
routes.delete('/enrollments', EnrollmentController.delete);

routes.get('/helporders', AnswerHelpOrderController.index);
routes.put('/helporders/:id/answer', AnswerHelpOrderController.update);

export default routes;
