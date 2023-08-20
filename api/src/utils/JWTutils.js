const JWT = require("jsonwebtoken");
const { InvalidToken } = require("../db.js");
const JWT_SECRET = process.env.JWT_SECRET_TEXT; //obtiene la llave secreta para verificar los token desde el .env

const JWTverify = async (token) => {  // verificamos la autenticidad del token utilizado en JWT_SECRET
	try {
		const res = JWT.verify(token, JWT_SECRET);
		return { isValid: true, payload: res }; // res representa el payload descifrado en el token
	} catch (error) {
		return { isValid: false };
	}
};

//esta funcion toma los datos a incluir en el token y un tiempo limitado en horas.
const JWTgenerate = (payload = {}, expireInHrs = 1) => {
	return JWT.sign(payload, JWT_SECRET, { //
		expiresIn: 60 * 60 * expireInHrs, // expires in 1 hours
	});
};


// esta funcion busca si el token existe en la bd de tokens invalidos... true-->si no existe "esta limpio"
const JWTIsClean = async (token) => {
	const tokenExistInBlacklist = await InvalidToken.findOne({
		where: { token: token },
	});

	return !tokenExistInBlacklist;
};

const JWTInvalidate = async (token) => {
	const newInvalidToken = new InvalidToken({ token });
	await newInvalidToken.save();
	return "INVALID_TOKEN_SAVED";
};

// esta funcion toma un token y validaciones e invoca las funciones anteriores
const JWTVerifyAndInvalidate = async (
	token,
	options = { invalidateToken: true }
) => {
	const tokenValidated = await JWTverify(token); //verifica validez del token
	const tokenIsClean = await JWTIsClean(token);  // verifica que esta limpio
	
	if (options.invalidateToken) {
		await JWTInvalidate(token);
	}

	const payload = tokenValidated.payload;
	const isValid = !!tokenValidated.isValid;
	const isClean = !!tokenIsClean;

	return { isValid, isClean, payload };
};

module.exports = {
	JWTverify,
	JWTgenerate,
	JWTIsClean,
	JWTInvalidate,
	JWTVerifyAndInvalidate,
};