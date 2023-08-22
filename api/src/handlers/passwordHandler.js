
const postVerifyHandler = async (req, res) => {
    try {
        const {email} = req.body;
        const verify = await postUser(email);
        res.status(201).json(verify);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
};

const postRecoverHandler = async (req, res) => {
    try {
        const {password, token} = req.body;
        const recover = await postUser(password, token);
        res.status(201).json(recover);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
};

module.exports = {postVerifyHandler, postRecoverHandler};