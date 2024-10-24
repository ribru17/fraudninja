import { Email, Text } from "@shared_types";
import { Collection, Db, ObjectId } from "mongodb";

export type EmailDocument = Omit<Email, "_id"> & {
  _id: ObjectId;
};

export type TextDocument = Omit<Text, "_id"> & {
  _id: ObjectId;
};

export class ExerciseClient {
  private emailCollection: Collection<EmailDocument>;
  private textCollection: Collection<TextDocument>;
  constructor(db: Db) {
    this.emailCollection = db.collection("email_data");
    this.textCollection = db.collection("text_data");
  }

  async getAllMessages(): Promise<(EmailDocument | TextDocument)[]> {
    const [emails, texts] = await Promise.all([
      this.emailCollection.find().toArray(),
      this.textCollection.find().toArray(),
    ]);
    return [...emails, ...texts];
  }
  async getAllEmails(): Promise<EmailDocument[]> {
    return this.emailCollection.find().toArray();
  }

  async getAllTexts(): Promise<TextDocument[]> {
    return this.textCollection.find().toArray();
  }

  async getByLabel(
    spamLabel: string
  ): Promise<(EmailDocument | TextDocument)[]> {
    const [emails, texts] = await Promise.all([
      this.emailCollection.find({ label: spamLabel }).toArray(),
      this.textCollection.find({ label: spamLabel }).toArray(),
    ]);
    return [...emails, ...texts];
  }

  // main function to grab a random message to display
  async getRandomMessage(): Promise<EmailDocument | TextDocument | null> {
    const allData = await this.getAllMessages();

    //check if there's any available data
    if (allData.length === 0) {
      return null;
    }
    const randomIndex = Math.floor(Math.random() * allData.length);
    return allData[randomIndex];
  }
}
