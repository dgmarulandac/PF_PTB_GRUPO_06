const { JWTgenerate, JWTVerifyAndInvalidate } = require("../../utils/JWTutils");
const { User } = require("../../db");

const ConfirmRecover = async (req, res) => {
	const { token } = req.params;
	const { password } = req.body;

	const { isValid, isClean, payload } = await JWTVerifyAndInvalidate(token);

	if (!isValid || !isClean) {
		res
			.status(400)
			.send({
				success: false,
				message: "Token inválido o ya utilizado.",
			});
		return;
	}

	const user = await User.findOne({ where: { email: payload.email } });

	if (!user) {
		res
			.status(404)
			.send({ success: false, message: "Usuario no encontrado." });
		return;
		}

	user.password = password;
	await user.save();
						//genera un nuevo token JWT para el user actualizado con la funcion JWT generate
	const newToken = JWTgenerate({ email: user.email }); //con el correo electronico del usuario

	//enviamos respuesta con un estado 200 y msje de exito 
	res.status(200).send({
		success: true,
		message: "Contraseña actualizada con éxito.",
		data: { token: newToken },
	});
};

module.exports = { ConfirmRecover };