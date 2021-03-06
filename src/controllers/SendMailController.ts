import { Request, Response } from 'express';
import { resolve } from 'path';
import { getCustomRepository } from 'typeorm';
import { SurveyRepository } from '../repositories/SurveyRepository';
import { SurveyUserRepository } from '../repositories/SurveyUserRepository';
import { UserRepository } from '../repositories/UserRepository';
import SendMailService from '../services/SendMailService';

class SendMailController {

  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body;

    const userRepository = getCustomRepository(UserRepository);
    const surveyrRepository = getCustomRepository(SurveyRepository);
    const surveyUserRepository = getCustomRepository(SurveyUserRepository);

    const user = await userRepository.findOne({ email });

    if (!user)
      return response.status(400).json({ error: "User does not exists!" });

    const survey = await surveyrRepository.findOne({ id: survey_id });

    if (!survey)
      return response.status(400).json({ error: "Survey does not exists!" });


    const surveyUser = surveyUserRepository.create({
      user_id: user.id,
      survey_id: survey.id
    })

    const surveyUserAlreadyExists = await surveyUserRepository.findOne({
      where: { user_id: user.id, value:  null},
      relations: ['user','survey']
    });

    const npsPath = resolve(__dirname, "..","views","emails","nps.hbs");

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      id: "",
      link: process.env.URL_MAIL
    };    

    if(surveyUserAlreadyExists) {
      variables.id = surveyUserAlreadyExists.id;
      await SendMailService.execute(email, survey.title, variables, npsPath);
      return response.json({ message: 'Dados retornados com sucesso', data: surveyUserAlreadyExists });
    }

    surveyUserRepository.save(surveyUser)

    variables.id = surveyUser.id;

    const mail = await SendMailService.execute(email, survey.title, variables, npsPath);

    return response.status(201).json({ message: 'E-mail enviado com sucesso!', mail });
  }

}

export { SendMailController };
