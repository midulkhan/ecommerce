import nodemailer from "nodemailer";

async function sendEmail({ username, email, emailType, token }) {
  try {
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS,
      },
    });

    const mailerOptions = {
      from: "mrnkh15@gmail.com",
      to: email,
      subject: "Verification email",
      html: `Hi ${username}, <br> here is your verification email <br> <b> <a href="http://localhost:3000/verification?${token}">Click here to verify</a></b>`,
    };

    const Send = transporter.sendMail(mailerOptions);
    return Send;
  } catch (error) {
    throw new Error(error);
  }
}

export default sendEmail;
