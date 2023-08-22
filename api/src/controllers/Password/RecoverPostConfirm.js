const { User } = require("../../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {SECRET} = process.env;

const postRecover = async (password, token) => {

	let userId = "";

	jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            throw Error ("Enlace inválido o ya utilizado.");
        }
        userId = decoded.id;
    });

	const user = await User.findByPk(userId);

	if (!user) {
		throw Error ("Usuario no encontrado.");
	}

	password = bcrypt.hashSync(password, 8);
	user.password = password;
	await user.save();

	return("Contraseña actualizada con éxito.");
};

module.exports = { postRecover };