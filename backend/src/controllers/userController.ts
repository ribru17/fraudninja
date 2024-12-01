import { User } from '@shared_types';
import { InsertOneResultWithoutId, decodeHex, encodeHex } from '../utils';
import { UserClient } from '../clients';
import jwt from 'jsonwebtoken';
import { JWT_KEY } from '../settings';
import { InsertOneResult } from 'mongodb';
import { Request, NextFunction, Response } from 'express';
import { sendEmail } from '../utils/mailer'; // Adjust the import path as needed

export class UserController {
  constructor(private readonly client: UserClient) {}

  getAll = async (
    _: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const users = await this.client.getAll();
      const transformedUsers = users.map((user) => ({
        ...user,
        _id: encodeHex(user._id),
      }));
      res.json(transformedUsers);
    } catch (error) {
      next(error);
    }
  };

  getById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const decodedId = decodeHex(id);
      if (!decodedId) {
        res.status(400).json({ error: 'Invalid ID format' });
        return;
      }

      const user = await this.client.getById(decodedId);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.json({ ...user, _id: encodeHex(user._id) });
    } catch (error) {
      next(error); // Passes errors to the error-handling middleware
    }
  };

  getByToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        res.status(401).json({ error: 'Authorization token required' });
        return;
      }

      const sub = await UserController.verifyToken(token);
      if (sub) {
        const user = await this.getBySub(sub);
        if (user) {
          res.json(user);
          return;
        }
      }

      res.status(404).json({ error: 'User not found' });
    } catch (error) {
      next(error);
    }
  };

  async getByEmail(email: string): Promise<User | null> {
    const user = await this.client.getByEmail(email);
    if (!user) return null;
    return { ...user, _id: encodeHex(user._id) };
  }

  async getByUsername(username: string): Promise<User | null> {
    const user = await this.client.getByUsername(username);
    if (!user) return null;
    return { ...user, _id: encodeHex(user._id) };
  }

  async getBySub(userSub: string): Promise<User | null> {
    const user = await this.client.getBySub(userSub);
    if (!user) return null;
    return { ...user, _id: encodeHex(user._id) };
  }

  private static async verifyToken(token: string): Promise<string | null> {
    try {
      const { sub } = jwt.verify(token, JWT_KEY) as jwt.JwtPayload;
      return sub || null;
    } catch (err) {
      return null;
    }
  }

  async create(user: Omit<User, '_id'>): Promise<InsertOneResultWithoutId> {
    const createdUser: InsertOneResult = await this.client.create(user);

    // Send a welcome email to the user
    try {
      await sendEmail(
        user.email,
        '🎉 Welcome to FraudNinja! 🎉',
        `Hi ${user.username || 'Fraud Ninja Hero'},\n\n` +
          'We’re so excited to have you on board! 🎉\n\n' +
          'Thank you for signing up with FraudNinja! You’ve just joined an amazing community dedicated to learning how to spot scams and stay safe in the digital world. 💻🔒\n\n' +
          'Whether you’re here to sharpen your skills, stay informed, or become a master of fraud prevention, you’re in the right place! We’ve got a lot of fun and educational resources waiting for you.\n\n' +
          'Get started by exploring our training programs, or jump straight into our challenges to see how much you can learn and accomplish!\n\n' +
          'If you ever need help, have any questions, or just want to share your progress, we’re here for you. Reach out anytime — we’d love to hear from you!\n\n' +
          'Welcome aboard, and let’s make your FraudNinja journey amazing!\n\n' +
          'Best regards,\nThe FraudNinja Team\n\n' +
          'P.S. Stay sharp and keep learning! 💪🚀',
      );
      console.log('Welcome email sent successfully');
    } catch (error) {
      console.error('Error sending welcome email:', error);
    }

    return {
      ...createdUser,
      insertedId: encodeHex(createdUser.insertedId),
    };
  }

  update = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        res.status(401).json({ error: 'Authorization token required' });
        return;
      }

      const { id } = req.params;
      const decodedId = decodeHex(id);
      if (!decodedId) {
        res.status(400).json({ error: 'Invalid user ID' });
        return;
      }

      const userUpdates: Partial<User> = req.body;
      const existingUser = await this.client.getById(decodedId);

      if (!existingUser) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      const updatedUser = await this.client.update(decodedId, {
        ...userUpdates,
        _id: decodedId,
      });

      if (!updatedUser) {
        res.status(500).json({ error: 'Failed to update user' });
        return;
      }

      if (
        userUpdates.overallScore &&
        userUpdates.overallScore >= 1000 &&
        existingUser.overallScore < 1000
      ) {
        try {
          await sendEmail(
            existingUser.email,
            '🎉 Congratulations, Graduate! 🎉',
            `Dear ${existingUser.username || 'Fraud Ninja Graduate'},\n\n` +
              'Amazing news! You’ve officially reached 1000 points and have graduated from FraudNinja! 🎓🎉\n\n' +
              'Your hard work and dedication have paid off, and we couldn’t be more excited to welcome you to the FraudNinja alumni! \n\n' +
              'As a graduate, you’ve earned the skills and knowledge to confidently identify scams and navigate the online world with confidence. Keep up the great work, and remember, this is just the beginning of your journey!\n\n' +
              'We’re so proud of you and can’t wait to see where your new skills take you. Congratulations once again, and welcome to the FraudNinja Graduates Club!\n\n' +
              'Best wishes,\nThe FraudNinja Team\n\n' +
              'P.S. Stay sharp and keep learning! 🚀',
          );
          console.log('Congratulations email sent successfully');
        } catch (error) {
          console.error('Error sending congratulations email:', error);
        }
      }

      res.json({ ...updatedUser, _id: encodeHex(updatedUser._id) });
    } catch (error) {
      next(error);
    }
  };
}
