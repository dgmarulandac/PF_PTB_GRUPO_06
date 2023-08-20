const {
	RecoverPass,
} = require("../../controllers/RecoverController/RecoverPostPass");

const RecoverPostPassHandler = async (req, res) => {
	try {
		const result = await RecoverPass(req, res);
		res.status(200).json(result);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

module.exports = { RecoverPostPassHandler };