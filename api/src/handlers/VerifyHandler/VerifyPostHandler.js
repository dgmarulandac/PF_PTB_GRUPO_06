const {
	VerifyPostController,
} = require("../../controllers/VerifyController/VerifyPostController");

const VerifyPostHandler = async (req, res) => {
	const { displayName } = req.body;
	try {
		res.status(200).json(await VerifyPostController(displayName));
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

module.exports = { VerifyPostHandler };