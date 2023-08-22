const postVerify = require("../controllers/Password/postVerify");
const postRecover = require("../controllers/Password/postRecover");

const postVerifyHandler = async (req, res) => {
    try {
        const {email} = req.body;
        const verify = await postVerify(email);
        res.status(201).json(verify);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
};

const postRecoverHandler = async (req, res) => {
    try {
        const {password, token} = req.body;
        const recover = await postRecover(password, token);
        res.status(201).json(recover);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
};

module.exports = {postVerifyHandler, postRecoverHandler};