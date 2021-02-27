import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveyRepository } from '../repositories/SurveyRepository';

class SurveyController {

  async index(request: Request, response: Response) {
    const surveyRepository = getCustomRepository(SurveyRepository);
    const query = request.query;

    const all = await surveyRepository.find();

    return response.json({ message: 'Dados recebidos com sucesso', data: all });
  }

  async store(request: Request, response: Response) {
    const { title, description } = request.body;
    const surveyRepository = getCustomRepository(SurveyRepository);
    const survey = await surveyRepository.create({
      title, description
    })
    await surveyRepository.save(survey);
    return response.status(201).json({ message: 'Dados recebidos com sucesso', data: survey });
  }



}

export { SurveyController };
