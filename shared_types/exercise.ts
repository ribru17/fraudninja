import type { scamCategories } from './scamCategory';

export type Exercise = {
  type: string;
  label: string;
  category: scamCategories;
  message: string;
  feedback: string;
};

export type Email = Exercise & {
  emailSender: string;
};

export type Text = Exercise & {
  phoneNumber: string;
};
