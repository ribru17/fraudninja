import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

async function sendEmail(to: string, subject: string, text: string) {
  // Create a transporter object using Gmail SMTP transport
  dotenv.config();

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  // Send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Fraud Ninja Team" <fraud.ninja.team@gmail.com>', // Replace with your sender address
    to: to, // List of receivers
    subject: subject, // Subject line
    text: text, // Plain text body
  });

  console.log('Message sent: %s', info.messageId);
}

export { sendEmail };
