const { transporter } = require ("../../config/mailer");

const sendPostUser = async( {name, email } ) =>{
    
  // send mail with defined transport object
  await transporter.sendMail({
      from: '"¡Bienvenido(a) a Boho!! REGISTRO EXITOSO 🎈" <bohocompany@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "¡Bienvenido/a a Boho! REGISTRO EXITOSO 🎈", // Subject line
    
      html: `
      <h1> ${name}, te damos la bienvenida a nuestra increíble plataforma de venta de boletos para eventos! 🎉</h1>
      
      <h3> Le informamos que su registro ha sido exitoso </h3>

      <span>Estamos emocionados de tenerte aquí y ser parte de tu experiencia en la venta y compra de boletos para los eventos más 
      emocionantes y entretenidos. Desde hoy podras comprar tus Tickets desde nuestro sitio web, conocer nuestra cartelera
      y adicionalmente podras crear tus propios eventos.</span>

      <br/>

      <span> Si tienes alguna pregunta o necesitas ayuda, no dudes en ponerte en contacto con nuestro equipo de soporte. 
      ¡Disfruta explorando y viviendo momentos memorables con nosotros!</span>
      <br/>
      <br/>
    <span>Bienvenido nuevamente y ¡que comience la diversión! 🎈🎫</span>
    <br/>
    <br/>
    <span> Atentamente, </span>
    <br/>
    <span> El equipo de Boho!! </span>
    <a href="https://pf-ptb-grupo-06.vercel.app" style="display: inline-block; background-color: #3498db; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Ingresa Aqui</a> 
      `
    });

};

module.exports = sendPostUser;
