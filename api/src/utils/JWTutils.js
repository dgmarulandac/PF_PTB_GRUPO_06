const JWT = require("jsonwebtoken");
const { InvalidToken } = require("../db.js");
const JWT_SECRET = process.env.JWT_SECRET_TEXT;

const JWTverify = async (token) => {
	try {
		const res = JWT.verify(token, JWT_SECRET);
		return { isValid: true, payload: res };
	} catch (error) {
		return { isValid: false };
	}
};

const JWTgenerate = (payload = {}, expireInHrs = 1) => {
	return JWT.sign(payload, JWT_SECRET, {
		expiresIn: 60 * 60 * expireInHrs, // expires in 1 hours
	});
};

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

const JWTVerifyAndInvalidate = async (
	token,
	options = { invalidateToken: true }
) => {
	const tokenValidated = await JWTverify(token);
	const tokenIsClean = await JWTIsClean(token);
	
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