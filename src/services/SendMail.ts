import nodemailer from "nodemailer";
import Config from "../config";

interface ISendMail {
  from: string;
  to: string;
  subject: string;
  html: string;
}

const SendMail = async (data: ISendMail) => {
  const transporter = nodemailer.createTransport({
    host: Config.mail.host,
    port: Config.mail.port,
    secure: Config.mail.port == 465 ? true : false,
    auth: {
      user: Config.mail.user,
      pass: Config.mail.pass
    }
  });

  const sended = await transporter.sendMail({
    from: data.from,
    to: data.to,
    subject: data.subject,
    html: data.html,
  })

  return sended;
}

export default SendMail;