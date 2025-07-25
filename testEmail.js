require("dotenv").config();
const transporter = require("./services/mailService");

async function sendTestEmail() {
  try {
    await transporter.sendMail({
      from: `"Test App" <${process.env.EMAIL_USER}>`,
      to: "despeche911@gmail.com",
      subject: "Correo de prueba",
      html: "<h1>¡Hola desde Nodemailer!</h1>",
    });
    console.log("Correo enviado correctamente");
  } catch (err) {
    console.error("Error al enviar el correo:", err);
  }
}

sendTestEmail();
