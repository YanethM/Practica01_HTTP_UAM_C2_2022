const mongoose = require('mongoose');
const express = require('express');
const sgMail = require('@sendgrid/mail');

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./src/handlers/errors.handler');
const app = express();
const routerApi = require('./src/routes');
require('dotenv').config();
const port = process.env.PORT;

app.listen(port, () => console.log('Active port', port));

mongoose
  .connect(process.env.MONGODB_STRING_CONNECTION)
  .then(() => console.log('Success connection with mongo'))
  .catch((error) => console.error(error));

/* ========================TWILIO======================== */
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    body: 'Prueba de twilio. Grupo ing software miercoles en la mañana.',
    from: '+17577808877',
    to: '+573045458490',
  })
  .then((message) => console.log(message.sid));

/* ========================TWILIO======================== */

/* ========================SENGRID======================== */
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'yaneth.mejiar@autonoma.edu.co', // Correo al cual se va a enviar
  from: 'yanethmejia.tic@ucaldas.edu.co', // Correo con el que se registraron en sendgrid
  subject: 'Asunto: Prueba twilio grupo miercoles',
  html: `
  <html>
    <head>
      <title></title>
    </head>
    <body>
    <div>
    Hola Mundo
    </div>
      <div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5">
        <div class="Unsubscribe--addressLine">
          <p class="Unsubscribe--senderName"
            style="font-size:12px;line-height:20px"
          >
            {{Sender_Name}}
          </p>
          <p style="font-size:12px;line-height:20px">
            <span class="Unsubscribe--senderAddress">{{Sender_Address}}</span>, <span class="Unsubscribe--senderCity">{{Sender_City}}</span>, <span class="Unsubscribe--senderState">{{Sender_State}}</span> <span class="Unsubscribe--senderZip">{{Sender_Zip}}</span>
          </p>
        </div>
        <p style="font-size:12px; line-height:20px;">
          <a class="Unsubscribe--unsubscribeLink" href="{{{unsubscribe}}}" target="_blank" style="font-family:sans-serif;text-decoration:none;">
            Unsubscribe
          </a>
          -
          <a href="{{{unsubscribe_preferences}}}" target="_blank" class="Unsubscribe--unsubscribePreferences" style="font-family:sans-serif;text-decoration:none;">
            Unsubscribe Preferences
          </a>
        </p>
      </div>
    </body>
  </html>
  `,
};
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent');
  })
  .catch((error) => {
    console.error(error);
  });
/* ========================SENGRID======================== */

app.use(express.json());
app.use(logErrors);
app.use(errorHandler);
app.use(boomErrorHandler);

routerApi(app);
