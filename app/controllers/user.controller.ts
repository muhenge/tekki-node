import dbConfig from '../../config/ormconfig';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.entity';
import { validate } from 'class-validator';

const userRepository = dbConfig.getRepository(User);

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const user = await userRepository.create(req.body.user);
  const errors = await validate(user);
  if (errors.length > 0) {
    res.status(400).json({errors: errors.map(error => error.constraints)});
    return;
  }
  try {
    await userRepository.save(user)
    res.status(201).json({ user: user });
  }
  catch (err) {
    res.status(409).json({ message: "Email already in use" });
    return;
  }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  
};



