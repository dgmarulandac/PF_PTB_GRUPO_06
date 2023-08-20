const nodemailer = require("nodemailer");
const mainHtmlContent = require("../../config/mainHtmlContent");
const { JWTgenerate } = require("../../utils/JWTutils");
const { User } = require("../../db.js");
const { USER, PASS, HOSTMAILER, MAILERPORT, SERVICE } = process.env;

const RecoverPass = async (req, res) => {
	try {
		const { email } = req.body;

		if (!email) {
			return res
				.status(400)
				.json({
					success: false,
					message: "No se proporcionó ningún email.",
				});
		}

		const token = JWTgenerate({ email });

		const user = await User.findOne({
			where: { email: email, active: true },
		});

		if (!user) {
			return res
				.status(404)
				.json({
					success: false,
					message:
						"No se encontró ningún usuario con ese email.",
				});
		}

		const transporter = nodemailer.createTransport({
			host: HOSTMAILER,
			port: MAILERPORT,
			secure: true,
			service: SERVICE,
			auth: {
				user: USER,
				pass: PASS,
			},
			tls: { rejectUnauthorized: false },
		});

		await transporter.verify();

		const mailOptions = {
			from: `BOHO ${USER}`,
			to: email,
			subject: "BOHO | Recuperar contraseña",
			text: "¿Te olvidaste la contraseña?",
			html: mainHtmlContent(
				"Recuperar contraseña",
				`https://pf-ptb-grupo-06.vercel.app/recover/${token}`
			),
		};

		await transporter.sendMail(mailOptions);

		return res
			.status(200)
			.json({ success: true, message: "Email enviado con éxito." });
	} catch (error) {
		console.error("Error:", error);
		return res
			.status(500)
			.json({
				success: false,
				message: "Error interno del servidor.",
				error: error.toString(),
			});
	}
};

module.exports = { RecoverPass };