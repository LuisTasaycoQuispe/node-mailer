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
    transporter.sendMail({
      from: `"Web Suscripción" <${EMAIL_USER}>`,
      to: EMAIL_USER,
      subject: 'Nueva suscripción',
      html: `
        <div style="background-color: #f0f2f5; padding: 20px; font-family: sans-serif;">
          <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff; border-left: 4px solid #cf8568; padding: 30px; border-radius: 8px;">
            <h2 style="color: #1a345a; font-size: 18px; margin-top: 0;">🔔 Nueva Solicitud Recibida</h2>
            <p style="color: #666; font-size: 14px;">Se ha registrado un nuevo interesado desde la web:</p>
            
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr>
                <td style="padding: 10px 0; color: #999; font-size: 13px; text-transform: uppercase;">Cliente</td>
                <td style="padding: 10px 0; color: #333; font-weight: 600; text-align: right;">${nombre} ${apellido || ''}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #999; font-size: 13px; text-transform: uppercase;">Email</td>
                <td style="padding: 10px 0; color: #cf8568; font-weight: 600; text-align: right;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #999; font-size: 13px; text-transform: uppercase;">Fecha</td>
                <td style="padding: 10px 0; color: #333; text-align: right;">${new Date().toLocaleDateString('es-PE')}</td>
              </tr>
            </table>

            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; text-align: center;">
              <span style="color: #1a345a; font-size: 12px; font-weight: bold;">Origen: Peru Luxury Journey - WEB - Formulario de Contacto</span>
            </div>
          </div>
        </div>
      `
    });

    transporter.sendMail({
      from: `"Peru Luxury Journeys" <${EMAIL_USER}>`,
      to: email,
      subject: '¡Gracias por suscribirte!',
      html: `
      <div style="background-color: #f4f4f4; padding: 20px; font-family: 'Segoe UI', Helvetica, Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
          
          <div style="background-color: #1a345a; padding: 30px; text-align: center;">
            <h2 style="color: #cf8568; margin: 0; font-size: 14px; letter-spacing: 4px; font-weight: 800;">PERU LUXURY JOURNEYS</h2>
          </div>

          <div style="position: relative;">
            <img src="https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1470&auto=format&fit=crop" alt="Machu Picchu" style="width: 100%; height: auto; display: block;">
          </div>

          <div style="padding: 40px 30px; text-align: center;">
            <h1 style="color: #1a345a; font-size: 26px; font-weight: 300; margin-bottom: 20px;">Bienvenido a lo Extraordinario, <span style="font-weight: 600;">${nombre}</span>.</h1>
            <p style="color: #555; font-size: 16px; line-height: 1.8; margin-bottom: 30px;">
              Gracias por unirte a nuestra comunidad exclusiva. Prepárate para descubrir el Perú desde una perspectiva privilegiada: gastronomía de clase mundial, paisajes ancestrales y un servicio diseñado a tu medida.
            </p>
            
            <a href="https://peruluxuryjourneys.com" style="background-color: #cf8568; color: #ffffff; padding: 16px 35px; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 14px; display: inline-block; transition: all 0.3s ease;">
              EXPLORAR DESTINOS
            </a>
          </div>

          <div style="background-color: #f9f9f9; padding: 30px; text-align: center; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 12px; margin: 0;">Recibiste este correo porque te suscribiste en nuestro portal oficial.</p>
            <div style="margin-top: 15px;">
              <span style="color: #1a345a; font-weight: 700; font-size: 12px;">© 2026 PERU LUXURY JOURNEYS</span>
            </div>
          </div>
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
    transporter.sendMail({
      from: `"Web Contacto" <${EMAIL_USER}>`,
      to: EMAIL_USER,
      subject: 'Nueva solicitud de itinerario',
      html: `
        <div style="max-width: 600px; margin: 0 auto; background-color: white; font-family: sans-serif; text-align: center;">
          <div style="padding: 20px; text-align: left;">
            <span style="color: #e9b200; font-weight: 800; font-size: 14px;">PERU LUXURY JOURNEYS</span>
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

    transporter.sendMail({
      from: `"Peru Luxury Journeys" <${EMAIL_USER}>`,
      to: email,
      subject: 'We received your requesrrt!',
      html: `
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; font-family: sans-serif; text-align: center; border-radius: 10px; overflow: hidden;">
          <div style="padding: 20px; text-align: left; background-color: #f9f9f9;">
            <span style="color: #e9b200; font-weight: 800; font-size: 14px; letter-spacing: 1px;">PERU LUXURY JOURNEYS</span>
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