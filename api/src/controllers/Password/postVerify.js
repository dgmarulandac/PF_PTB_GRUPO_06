const { User } = require("../../db");
const sendPasswordReset = require("../Email/emailPasswordReset");
const {SECRET} = process.env;
const jwt = require("jsonwebtoken");

const postVerify = async (email) => {
	
	if (!email) {
		throw new Error("Se ha pasado un correo vacio.");
	}

	const user = await User.findOne({
		where: {
			email: email,
		},
	});

	if (!user) {
		throw new Error("Correo no encontrado. Registrese");
	}

	const token = jwt.sign({id: user.id}, SECRET, {
        algorithm: 'HS256',
        allowInsecureKeySizes: false,
        expiresIn: 3600, // 1 hour
    });

	sendPasswordReset(token, user.email);
	return("Correo encontrado, enviando correo de reincio de contraseña.")
};

module.exports = postVerify;