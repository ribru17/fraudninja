export type Exercise = {
  label: string;
  message: string;
  difficulty: number;
  feedback: string;
};

export type Email = Exercise & {
  emailSender: string;
};

export type Text = Exercise & {
  phoneNumber: string;
};
