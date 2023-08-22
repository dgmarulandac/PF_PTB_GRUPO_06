const { transporter } = require ("../../config/mailer");
const { mainHtmlContent } = require ("../../config/mainHtmlContent");

const sendPasswordReset = async ( token, email ) => {
    await transporter.sendMail({
        from: '"Boho Recuperar contraseña 🎈" <bohocompany@gmail.com>',
        to: email,
        subject: "BOHO | Recuperar contraseña",
        text: "¿Te olvidaste la contraseña?",
        html: mainHtmlContent(
            "Recuperar contraseña",
            `https://pf-ptb-grupo-06.vercel.app/recover/${token}`
        ),
    });
};

module.exports = sendPasswordReset;