import { Request, Response } from 'express';
import { getCustomRepository, Not, IsNull } from 'typeorm';
import { SurveyRepository } from '../repositories/SurveyRepository';
import { SurveyUserRepository } from '../repositories/SurveyUserRepository';

export class NpsController {

  async execute(request: Request, response: Response) {
    const { survey_id } =  request.params;

    console.log({
      survey_id
    });

    const surveysUserRepository = getCustomRepository(SurveyUserRepository);

    const surveyUsers = await surveysUserRepository.find({
      survey_id,
      value: Not(IsNull())
    });

    const detractors = surveyUsers.filter(
      (survey) => (survey.value >= 0 && survey.value <= 6)
    ).length;

    const passives = surveyUsers.filter(
      (survey) => (survey.value >= 7 && survey.value <= 8)
    ).length;    

    const promoters = surveyUsers.filter(
      (survey) => (survey.value >= 9 && survey.value <= 10)
    ).length;

    const totalAnswers = surveyUsers.length;

    const calculate = ((promoters -detractors) / totalAnswers) * 100;

    return response.json({
      message: "Dados retornados com sucesso!",
      data: {
        detractors,
        passives,
        promoters,
        totalAnswers,
        nps: Number(calculate.toFixed(2))
      }
    })

  }

}