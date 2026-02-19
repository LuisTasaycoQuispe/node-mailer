const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors'); 

const app = express();
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const EMAIL_USER = "luistasayco3030@gmail.com";
const EMAIL_PASS = "xkii szmn wopp rqdr";


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});
app.post('/subscribe', async (req, res) => {
  const { nombre, email } = req.body;

  if (!email) {
    return res.status(400).json({ mensaje: 'El email es requerido' });
  }

  try {
    await transporter.sendMail({
      from: `"Web Suscripción" <${EMAIL_USER}>`,
      to: EMAIL_USER, 
      subject: 'Nueva suscripción',
      html: `

          <div style="background-color: white; display: flex; flex-direction: column; justify-content: center; align-items: center;  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
        <div style="width: 90%; margin-top: 10px; margin-bottom: 20px; display: flex; justify-content: space-between;">
            <span style="color: #cf8568; font-weight: 800;">PERU LUXURY JOURNEYS</span>
            <span style="color: #c9c9c9; font-weight: 400;">web - form</span>
        </div>
        <div style="width: 90%; border-radius: 30px; display: flex;padding: 10px; align-items: center; justify-content: center;  background-color:#E6E6E6;">
            <img style="width: 270px;" src="https://blog.aspiration.marketing/hs-fs/hubfs/chub_backup/Blog_Email%20Marketing_email%20deliverability.webp?width=800&height=450&name=Blog_Email%20Marketing_email%20deliverability.webp" alt="logo-bandeja">
        </div>

        <div style="width: 80%; text-align: center; margin-top: 10px; margin-bottom: 20px;">
            <span style="color: rgb(46, 46, 46); font-weight: 300; margin-top: 15px;">¡Hola! Tienes un nuevo interesado en la plataforma. Aquí están los detalles del cliente</span>
            <br>
            <br>
            <span style="color: rgb(13, 59, 102); font-size: 15px; font-weight: 700;">
            Origen: Web - Peru Luxury Journeys
            </span>
        </div>

        <div style="display: flex; gap:15px; margin-top: 20px; justify-content: center; align-items: center;">
            <img style="width: 40px;"  src="https://choose2rent.com/wp-content/themes/choose2rent/custom-gutenberg/markup-template/markup/img/none-box-tada.gif" alt="logo-celecracion">
            <span style="font-size: 30px; font-weight: 700; color: rgb(88, 88, 88); "> ${nombre || 'No proporcionado'}</span>
            <img style="width: 40px;"  src="https://choose2rent.com/wp-content/themes/choose2rent/custom-gutenberg/markup-template/markup/img/none-box-tada.gif" alt="logo-celecracion">
        </div>
        <div style="display: flex; justify-content: center;margin-top: 20px; align-items: center; text-align: center;">
            <span style="font-weight: 400; color: gray;"> ${email}</span>
        </div>
        <br>

        <div style="display:flex;flex-direction: column; justify-content: center; align-items: start;  background-color: rgb(26, 52, 90); width: 100%; height: 50px;">
            <span style="margin-left: 20px; color: rgb(236, 236, 236); font-weight: 500; "> ${new Date().toLocaleString('es-PE')}</span>
        </div>
    </div>
      `
    });

    await transporter.sendMail({
      from: `"Peru Luxury Journeys" <${EMAIL_USER}>`,
      to: email,
      subject: '¡Gracias por suscribirte!',
      html: `
        <h2>¡Bienvenido${nombre ? ', ' + nombre : ''}!</h2>
        <p>Te has suscrito exitosamente a Peru Luxury Journeys. Pronto recibirás noticias de nuestra parte.</p>
      `
    });

    res.json({ mensaje: '¡Suscripción exitosa!' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al enviar el correo' });
  }
});

const PORT = process.env.PORT || 8000; 

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});