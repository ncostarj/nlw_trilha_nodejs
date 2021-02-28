import { Router } from 'express';
import { AnswerController } from './controllers/AnswerController';
import { NpsController } from './controllers/NpsController';
import { SendMailController } from './controllers/SendMailController';
import { SurveyController } from './controllers/SurveyController';
import { UserController } from './controllers/UserController';

const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendMailController();
const answerController = new AnswerController();
const npsController = new NpsController();

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
router.get('/answers/:value', answerController.execute);

/**
 * Sendmail
 */
router.post('/sendMail', sendMailController.execute);


/**
 * Nps
 */
router.post('/nps/:survey_id', npsController.execute);

export { router };
