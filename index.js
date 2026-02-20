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
  const { nombre, apellido, email } = req.body;

  if (!email || !nombre || !apellido) {
    return res.status(400).json({ mensaje: 'El nombre, apellido y email son requerido' });
  }

  try {
    await transporter.sendMail({
      from: `"Web Suscripción" <${EMAIL_USER}>`,
      to: EMAIL_USER,
      subject: 'Nueva suscripción',
      html: `
        <div style="max-width: 600px; margin: 0 auto; background-color: white; font-family: sans-serif; text-align: center;">
          <div style="padding: 20px; text-align: left;">
            <span style="color: #cf8568; font-weight: 800; font-size: 14px;">PERU LUXURY JOURNEYS</span>
            <span style="color: #c9c9c9; font-weight: 400; font-size: 14px; float: right;">web - form</span>
            <div style="clear: both;"></div>
          </div>
          <div style="width: 90%; border-radius: 30px; background-color: #E6E6E6; margin: 0 auto; padding: 20px;">
            <img style="width: 250px; display: block; margin: 0 auto;" src="https://blog.aspiration.marketing/hs-fs/hubfs/chub_backup/Blog_Email%20Marketing_email%20deliverability.webp?width=800&height=450&name=Blog_Email%20Marketing_email%20deliverability.webp" alt="logo-bandeja">
          </div>
          <div style="width: 80%; margin: 20px auto; line-height: 1.5;">
            <span style="color: #2e2e2e; font-weight: 300;">¡Hola! Tienes un nuevo interesado en la plataforma. Aquí están los detalles del cliente:</span>
            <br><br>
            <span style="color: #0d3b66; font-size: 15px; font-weight: 700;">Origen: Web - Peru Luxury Journeys</span>
          </div>
          <div style="margin-top: 20px; text-align: center;">
            <img style="width: 30px; vertical-align: middle;" src="https://choose2rent.com/wp-content/themes/choose2rent/custom-gutenberg/markup-template/markup/img/none-box-tada.gif" alt="tada">
            <span style="font-size: 22px; font-weight: 700; color: #585858; vertical-align: middle; margin: 0 10px;">${nombre} ${apellido}</span>
            <img style="width: 30px; vertical-align: middle;" src="https://choose2rent.com/wp-content/themes/choose2rent/custom-gutenberg/markup-template/markup/img/none-box-tada.gif" alt="tada">
          </div>
          <div style="margin-top: 15px; padding-bottom: 20px;">
            <span style="font-weight: 400; color: gray; font-size: 16px;">${email}</span>
          </div>
          <div style="background-color: #1a345a; padding: 15px; text-align: left; border-radius: 0 0 10px 10px;">
            <span style="margin-left: 20px; color: #ececec; font-weight: 500; font-size: 13px;">📅 ${new Date().toLocaleString('es-PE')}</span>
          </div>
        </div>
      `
    });

    // Email al usuario
    await transporter.sendMail({
      from: `"Peru Luxury Journeys" <${EMAIL_USER}>`,
      to: email,
      subject: '¡Gracias por suscribirte!',
      html: `
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; font-family: sans-serif; text-align: center; border-radius: 10px; overflow: hidden;">
          <div style="padding: 20px; text-align: left; background-color: #f9f9f9;">
            <span style="color: #cf8568; font-weight: 800; font-size: 14px; letter-spacing: 1px;">PERU LUXURY JOURNEYS</span>
            <span style="color: #c9c9c9; font-weight: 400; font-size: 14px; float: right;">Welcome</span>
            <div style="clear: both;"></div>
          </div>
          <div style="width: 100%; background-color: #E6E6E6; margin: 0 auto;">
            <img style="width: 100%; max-width: 600px; display: block;" src="https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1470&auto=format&fit=crop" alt="Machu Picchu Luxury">
          </div>
          <div style="padding: 40px 20px; line-height: 1.6;">
            <h1 style="color: #0d3b66; font-size: 24px; margin-bottom: 10px;">¡Bienvenido${nombre ? ', ' + nombre : ''}!</h1>
            <p style="color: #585858; font-size: 16px; font-weight: 300;">
              Gracias por suscribirte a nuestro boletín exclusivo. Desde ahora, serás el primero en conocer nuestras experiencias gastronómicas, destinos ocultos y promociones de lujo en el corazón del Perú.
            </p>
            <div style="margin-top: 10px;">
              <img style="width: 40px;" src="https://choose2rent.com/wp-content/themes/choose2rent/custom-gutenberg/markup-template/markup/img/none-box-tada.gif" alt="tada">
            </div>
          </div>
          <div style="padding-bottom: 40px;">
            <a href="https://peruluxuryjourneys.com" style="background-color: #cf8568; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: 600; font-size: 14px;">Explorar Destinos</a>
          </div>
          <div style="background-color: #1a345a; padding: 20px; text-align: center;">
            <p style="color: #ececec; font-size: 12px; margin: 0;">Has recibido este correo porque te suscribiste en nuestro sitio web.</p>
            <p style="color: #cf8568; font-size: 12px; margin: 5px 0 0 0;">© 2026 Peru Luxury Journeys | Lima, Perú</p>
          </div>
        </div>
      `
    });

    res.json({ mensaje: '¡Suscripción exitosa!' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al enviar el correo' });
  }
});

app.post('/contact', async (req, res) => {
  const { nombre, email } = req.body;

  if (!nombre || !email) {
    return res.status(400).json({ mensaje: 'Nombre y email son requeridos' });
  }

  try {
    await transporter.sendMail({
      from: `"Web Contacto" <${EMAIL_USER}>`,
      to: EMAIL_USER,
      subject: 'Nueva solicitud de itinerario',
      html: `
        <div style="max-width: 600px; margin: 0 auto; background-color: white; font-family: sans-serif; text-align: center;">
          <div style="padding: 20px; text-align: left;">
            <span style="color: #cf8568; font-weight: 800; font-size: 14px;">PERU LUXURY JOURNEYS</span>
            <span style="color: #c9c9c9; font-weight: 400; font-size: 14px; float: right;">web - itinerary request</span>
            <div style="clear: both;"></div>
          </div>
          <div style="width: 80%; margin: 30px auto; line-height: 1.5;">
            <span style="color: #2e2e2e; font-weight: 300;">¡Tienes una nueva solicitud de itinerario personalizado!</span>
            <br><br>
            <span style="color: #0d3b66; font-size: 15px; font-weight: 700;">Origen: Web - Peru Luxury Journeys</span>
          </div>
          <div style="margin-top: 20px; text-align: center;">
            <img style="width: 30px; vertical-align: middle;" src="https://choose2rent.com/wp-content/themes/choose2rent/custom-gutenberg/markup-template/markup/img/none-box-tada.gif" alt="tada">
            <span style="font-size: 22px; font-weight: 700; color: #585858; vertical-align: middle; margin: 0 10px;">${nombre}</span>
            <img style="width: 30px; vertical-align: middle;" src="https://choose2rent.com/wp-content/themes/choose2rent/custom-gutenberg/markup-template/markup/img/none-box-tada.gif" alt="tada">
          </div>
          <div style="margin-top: 15px; padding-bottom: 20px;">
            <span style="font-weight: 400; color: gray; font-size: 16px;">${email}</span>
          </div>
          <div style="background-color: #1a345a; padding: 15px; text-align: left; border-radius: 0 0 10px 10px;">
            <span style="margin-left: 20px; color: #ececec; font-weight: 500; font-size: 13px;">📅 ${new Date().toLocaleString('es-PE')}</span>
          </div>
        </div>
      `
    });

    await transporter.sendMail({
      from: `"Peru Luxury Journeys" <${EMAIL_USER}>`,
      to: email,
      subject: 'We received your request!',
      html: `
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; font-family: sans-serif; text-align: center; border-radius: 10px; overflow: hidden;">
          <div style="padding: 20px; text-align: left; background-color: #f9f9f9;">
            <span style="color: #cf8568; font-weight: 800; font-size: 14px; letter-spacing: 1px;">PERU LUXURY JOURNEYS</span>
            <span style="color: #c9c9c9; font-weight: 400; font-size: 14px; float: right;">Itinerary Request</span>
            <div style="clear: both;"></div>
          </div>
          <div style="width: 100%; background-color: #E6E6E6;">
            <img style="width: 100%; max-width: 600px; display: block;" src="https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1470&auto=format&fit=crop" alt="Machu Picchu Luxury">
          </div>
          <div style="padding: 40px 20px; line-height: 1.6;">
            <h1 style="color: #0d3b66; font-size: 24px; margin-bottom: 10px;">Thank you, ${nombre}!</h1>
            <p style="color: #585858; font-size: 16px; font-weight: 300;">
              We've received your request for a personalized itinerary. Our team will get in touch with you shortly to craft your perfect luxury journey through Peru.
            </p>
          </div>
          <div style="padding-bottom: 40px;">
            <a href="https://peruluxuryjourneys.com" style="background-color: #cf8568; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: 600; font-size: 14px;">Explore Destinations</a>
          </div>
          <div style="background-color: #1a345a; padding: 20px; text-align: center;">
            <p style="color: #ececec; font-size: 12px; margin: 0;">You received this email because you submitted a request on our website.</p>
            <p style="color: #cf8568; font-size: 12px; margin: 5px 0 0 0;">© 2026 Peru Luxury Journeys | Lima, Perú</p>
          </div>
        </div>
      `
    });

    res.json({ mensaje: '¡Solicitud enviada!' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al enviar el correo' });
  }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});