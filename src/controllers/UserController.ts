import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';

class UserController {

  async search(request: Request, response: Response) {
    const query = request.query;
    response.json({ message: 'Dados recebidos com sucesso', data: query });
  }

  async create(request: Request, response: Response) {
    const { name, email } = request.body;
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
