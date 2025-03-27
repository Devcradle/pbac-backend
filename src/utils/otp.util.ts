import { createTransport } from 'nodemailer';

export async function sendCodeEmail(
  email: string,
  code: string
): Promise<void> {
  const transporter = createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAILID,
      pass: process.env.PASSWORD
    }
  });

  const mailOptions = {
    to: email,
    from: process.env.EMAILID,
    subject: 'Activation mail',
    text: `Code for activating mail : ${code}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Otp sent sucessfully');
  } catch (error) {
    console.error(error);
  }
}
