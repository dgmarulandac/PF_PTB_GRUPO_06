const { User } = require ("../../db");
const { transporter } = require ("../../config/mailer");

const sendPostUser = async( name, lastName, email, cellphone, registed, password ) =>{
    
// send mail with defined transport object
await transporter.sendMail({
    from: '"¡Bienvenido(a) a Boho!! USUARIO REGISTRADO 🎈" <bohocompany@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "¡Bienvenido/a a Boho! USUARIO REGISTRADO 🎈", // Subject line
    // text: "Hello world?", // plain text body
    html: `
    <h1>Estimado usuario ${name} ${lastName}, bienvenido a nuestra increíble plataforma de venta de boletos para eventos! 🎉</h1>
    
    <h3>Le informamos que su registro en nuestra plataforma ha sido exitoso</h3>

    <span>Estamos emocionados de tenerte aquí y ser parte de tu experiencia en la venta y compra de boletos para los eventos más 
    emocionantes y entretenidos. Desde conciertos de tus artistas favoritos hasta eventos deportivos llenos de adrenalina y 
    espectáculos culturales que te dejarán sin aliento, estamos aquí para hacer que cada momento sea inolvidable.</span>

    <br/>

    <span> Si tienes alguna pregunta o necesitas ayuda, no dudes en ponerte en contacto con nuestro amable equipo de soporte. 
    ¡Disfruta explorando y viviendo momentos memorables con nosotros!</span>
    <br/>
    <br/>
   <span>Bienvenido nuevamente y ¡que comience la diversión! 🎈🎫</span>
   <br/>
   <br/>
   <span> Atentamente, </span>
   <br/>
   <span> El equipo de Boho!! </span>
    `
  });

    return newUser;
}

module.exports = {
    sendPostUser,
}