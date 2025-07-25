require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const sendRecoveryEmail = async (email, token) => {
  const link = `http://localhost:8080/api/sessions/reset-password?token=${token}`;

  await transporter.sendMail({
    from: `"Test App" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Recuperación de contraseña",
    html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p><a href="${link}">${link}</a>`,
  });
};

module.exports = {
  sendRecoveryEmail,
};
