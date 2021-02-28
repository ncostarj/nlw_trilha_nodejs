import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import { SurveyUserRepository } from '../repositories/SurveyUserRepository';

export class AnswerController {
  async execute(request: Request, response: Response) {
    const { u } = request.query;
    const { value } = request.params;

    const surveyUserRepository = getCustomRepository(SurveyUserRepository);

    const surveyUser = await surveyUserRepository.findOne({ id: String(u) });

    if(!surveyUser) {
      throw new AppError("Survey does not exists!");
      // return response.status(400).json({ message: "Survey does not exists!" });
    }

    surveyUser.value = Number(value);

    await surveyUserRepository.save(surveyUser);

    return response.send({ message: "Dados recebidos com sucesso!", data: surveyUser });
  }
}