const nodemailer = require("nodemailer");
const { dtoFail } = require("./dto");

const sendEmail = async (email, subject, link, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_NAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_NAME,
      to: email,
      subject,
      html: `
        <h4 style="color: red">You have a request to reset password</h4>
        <p>Hi ${email}!</p>
        <p>We noticed your request to reset password. You need visit this link to move to reset password screen.</p>
        <p>Link: ${link}</p>
        <p>This link brings the token that <strong>will expire in 2 minutes</strong>. If you <strong>do not</strong> reset password in this time, you must <strong>send us your email again</strong> if you still want to reset password!</p>
        <p>Thanks,</p>
        <p>The Multirt Store team.</p>
      `,
    });
  } catch (error) {
    console.log(error)
    return dtoFail(res, "Cannot send mail!");
  }
};

module.exports = sendEmail;
