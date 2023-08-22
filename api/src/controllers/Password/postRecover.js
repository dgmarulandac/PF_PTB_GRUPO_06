const { User, InvalidToken } = require("../../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {SECRET} = process.env;

const postRecover = async (password, token) => {

	let userId = "";
	
	const checkToken = await InvalidToken.findOne({
		where: {
			token: token
		}
	});

	if( checkToken ) {
		throw Error('Enlace ya utilizado o invalido.');
	};

	jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            throw Error ("Enlace vencido.");
        }
        userId = decoded.id;
    });

	
	const user = await User.findByPk(userId);

	const newToken = await InvalidToken.create( {token} );

	if (!user) {
		throw Error ("Usuario no encontrado.");
	}

	password = bcrypt.hashSync(password, 8);
	user.password = password;
	await user.save();

	return("Contraseña actualizada con éxito.");
};

module.exports = postRecover;