import { Router } from 'express';
import { SendMailController } from './controllers/SendMailController';
import { SurveyController } from './controllers/SurveyController';
import { UserController } from './controllers/UserController';

const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendMailController();

/**
 * User
 */
router.get('/users', userController.search);
router.post('/users', userController.create);

/**
 * Survey
 */
router.get('/surveys', surveyController.index);
router.post('/surveys', surveyController.store);

/**
 * Answer
 */
router.get('/answers/{value}', surveyController.store);

/**
 * Sendmail
 */
router.post('/sendMail', sendMailController.execute);

export { router };
