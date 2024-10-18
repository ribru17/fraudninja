import { Email, Text } from "@shared_types";
import { ExerciseClient, EmailDocument, TextDocument } from "../clients"

export class ExerciseController {
    constructor(private readonly client: ExerciseClient) {}

    async getAllMessages(): Promise<(EmailDocument | TextDocument) []> {
        const allData = await this.client.getAllMessages();
        return allData;
    }

    async getAllEmails(): Promise<EmailDocument[]> {
        const emails = await this.client.getAllEmails();
        return emails;
    }

    async getAllTexts(): Promise<TextDocument[]> {
        const texts = await this.client.getAllTexts();
        return texts;
    }

    async getByLabel(label: string): Promise<(EmailDocument | TextDocument) []> {
        const labelData = await this.client.getByLabel(label);
        return labelData;
    }
    
    // main function to grab a random message to display
    async getRandomMessage(): Promise<EmailDocument | TextDocument | null> {
        const random = await this.client.getRandomMessage();
        return random;
    }
}