import { ExerciseClient, EmailDocument, TextDocument } from '../clients';
import { Request, NextFunction, Response } from 'express';

export class ExerciseController {
  constructor(private readonly client: ExerciseClient) {}

  // async getAllMessages(): Promise<(EmailDocument | TextDocument) []> {
  //     const allData = await this.client.getAllMessages();
  //     return allData;
  // }
  getAllExercises = async (
    _: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const exercises = await this.client.getAllExercises();
      if (!exercises) {
        res.status(404).json({ error: 'Exercises not found' });
        return;
      }
      res.json(exercises);
      return;
    } catch (error) {
      next(error); // Passes errors to the error-handling middleware
    }
  };

  async getAllEmails(): Promise<EmailDocument[]> {
    const emails = await this.client.getAllEmails();
    return emails;
  }

  async getAllTexts(): Promise<TextDocument[]> {
    const texts = await this.client.getAllTexts();
    return texts;
  }

  async getByLabel(label: string): Promise<(EmailDocument | TextDocument)[]> {
    const labelData = await this.client.getByLabel(label);
    return labelData;
  }

  // main function to grab a random message to display
  // async getRandomMessage(): Promise<EmailDocument | TextDocument | null> {
  //     const random = await this.client.getRandomMessage();
  //     return random;
  // }
  getRandomExercise = async (
    _: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const exercise = await this.client.getRandomExercise();
      if (!exercise) {
        res.status(404).json({ error: 'Exercises not found' });
        return;
      }
      res.json(exercise);
      return;
    } catch (error) {
      next(error); // Passes errors to the error-handling middleware
    }
  };

  getRandomExercises = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      // Get the `count` from the query parameter, defaulting to 10
      const count = parseInt(req.query.count as string) || 10;

      // Fetch all exercises from your client
      const allData = await this.client.getAllExercises();

      // If there aren't enough exercises, return all available exercises
      if (allData.length <= count) {
        res.json(allData);
        return;
      }

      // Shuffle the array using the Fisher-Yates algorithm
      for (let i = allData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allData[i], allData[j]] = [allData[j], allData[i]];
      }

      // Return the first `count` items from the shuffled array
      const randomExercises = allData.slice(0, count);
      res.json(randomExercises);
    } catch (error) {
      // Pass any errors to the error handler middleware
      next(error);
    }
  };
}
