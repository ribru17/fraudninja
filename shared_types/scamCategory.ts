import { z } from 'zod';

enum scamCategories {
  phishing = 'Phishing',
  job = 'Fake Job Offers',
}

export const scamCategory = z.nativeEnum(scamCategories);

export type ScamCategory = z.infer<typeof scamCategory>;
