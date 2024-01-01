import nodemailer from "nodemailer";

export const sendEmail = async (data: EmailInfoType) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: data.from,
    to: data.to,
    html: data.html,
    subject: data.subject,
    text: data.text,
  });
};
