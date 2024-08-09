import nodemailer from "nodemailer";

export const sendEmail = async (data: EmailInfoType) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: data.from,
    to: data.to,
    html: data.html,
    subject: data.subject,
    text: data.text,
  });
};
