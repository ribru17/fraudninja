import { Credentials, User } from '@shared_types';
import bcrypt from 'bcrypt';
import { UserController } from './userController';
import { JWT_KEY } from '../settings';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export class SessionController {
  constructor(private readonly userController: UserController) {}

  verifyAuthAndAttachUser = (
    req: Request,
    res: Response,
    next: NextFunction,
  ): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).send('Unauthorized');
      return;
    }
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_KEY);
      (req as any).user = { sub: (decoded as any).sub };
      next();
    } catch (err) {
      res.status(401).send('Invalid token');
      return;
    }
  };

  checkUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userSub = (req as any).user?.sub;
      if (userSub) {
        const user = await this.userController.getBySub(userSub);
        if (user) {
          res.status(200).json(user);
          return;
        }
        res.status(404).send('User not found');
        return;
      }
      res.status(400).send('User sub not found');
      return;
    } catch (error: any) {
      console.error(error);
      res.status(500).send('Server error');
      return;
    }
  };

  login = async (req: { body: Credentials }, res: any) => {
    try {
      const credentials = req.body;
      const user = await this.userController.getByEmail(credentials.email);

      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      const passwordMatch = await bcrypt.compare(
        credentials.password,
        user.password,
      );
      if (!passwordMatch) {
        return res
          .status(401)
          .json({ message: 'Incorrect username or password' });
      }

      const token = jwt.sign({ sub: user.sub }, JWT_KEY, {
        algorithm: 'HS256',
      });
      return res.status(200).json(token);
    } catch (error: any) {
      return res.status(500).json({ message: 'Server error' });
    }
  };

  signup = async (req: { body: Omit<User, '_id'> }, res: any) => {
    const partialUser = req.body;
    const user = await this.userController.getByEmail(partialUser.email);

    if (user) {
      res.status(409).json({ message: 'Already an account with this email' });
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(partialUser.password, 10);
      const userSub = await this.generateRandomSub();
      const newUser = {
        email: partialUser.email,
        username: partialUser.username,
        password: hashedPassword,
        sub: userSub,
      };

      await this.userController.create(newUser);
      const newUserDb = await this.userController.getByEmail(partialUser.email);
      res.status(201).json(newUserDb);
    } catch (error) {
      if (error instanceof Error) {
        res.status(409).json({ message: error.message });
      } else {
        res.status(409).json({ message: 'Unknown error' });
      }
    }
  };

  async generateRandomSub(): Promise<string> {
    const randomId = Math.random().toString(36).substring(2);
    const hashedId = await bcrypt.hash(randomId, 10);
    const sub = hashedId.substring(0, 16);
    return sub;
  }
}
