const {
	ConfirmRecover,
} = require("../../controllers/RecoverController/RecoverPostConfirm");

const RecoverConfirmHandler = async (req, res) => {
	try {
		const result = await ConfirmRecover(req, res);
		res.status(200).json(result);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

module.exports = { RecoverConfirmHandler };