import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';
import * as yup from 'yup';

class UserController {

  async search(request: Request, response: Response) {
    const query = request.query;
    response.json({ message: 'Dados recebidos com sucesso', data: query });
  }

  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required()
    });

    // if(!(await schema.isValid(request.body))) {
    //   return response.status(400).json({ error: "Validation failed!" });
    // }

    try {
      await schema.validate(request.body, { abortEarly:false });
    } catch(e) {
      return response.status(400).json({ error: e });
    }

    const userRepository = getCustomRepository(UserRepository);
    const userAlreadyExists = await userRepository.findOne({ email });

    if (userAlreadyExists) {
      return response.status(400).json({ error: "Usuário já existe!" });
    }

    const user = userRepository.create({
      name, email
    })
    await userRepository.save(user);
    response.status(201).json({ message: 'Dados recebidos com sucesso', data: user });
  }

}

export { UserController };
