const { transporter } = require("../../config/mailer");
const generateQRCode = require("../../config/generateQRCode"); // Import the QR code generator

const emailSuccessfulPayment = async ({ name, eventName, email, eventImage, price, quantity, currency, date, hour, address, country }) => {
  const qrCodeDataURL = await generateQRCode({eventName, date, hour, address});

  // send mail with defined transport object
  await transporter.sendMail({
    from: '"¡Bienvenido(a) a Boho!! PAGO EXITOSO 🎈" <bohocompany@gmail.com>', // sender address
    to: email, // list of receivers
    subject: " PAGO EXITOSO ", // Subject line
    attachDataUrls: true,
    html: `
    
    <h1> ${name}, Le informamos que su Pago ha sido exitoso 🎉</h1>
    
    <h2>Ticket de Venta:</h2>
    <p><strong>Evento:</strong> ${eventName}</p>
    <p><strong>Fecha:</strong> ${date}</p>
    <p><strong>Hora:</strong> ${hour}</p>
    <p><strong>Dirección:</strong> ${address}, ${country}</p>
    <p><strong>Precio:</strong> ${price} ${currency}</p>
    <p><strong>Cantidad:</strong> ${quantity}</p>
    
    <img src="${eventImage}" alt="Imagen del evento" width="200">
    <br/>
    <img src="${qrCodeDataURL}" alt="Código QR del evento" width="200"> 
    <br/>
    <br/>
    <br/>
    <span> Si tienes alguna pregunta o necesitas ayuda, no dudes en ponerte en contacto con nuestro equipo de soporte. ¡Disfruta explorando y viviendo momentos memorables con nosotros!</span>

    <br/>
    <br/>
    <span>Bienvenido nuevamente y ¡que comience la diversión! 🎈🎫</span>
    <br/>
    <br/>
    <span> Atentamente, </span>
    <br/>
    <span> El equipo de Boho!! </span>

    <br/>
    <br/>
    <a href="https://pf-ptb-grupo-06.vercel.app/">Ir al Inicio</a> 
    `
  });

};

module.exports = emailSuccessfulPayment;
