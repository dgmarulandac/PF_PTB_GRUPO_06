const getUsers = require("../controllers/User/getUsers");

const getUserHandler = async (req, res) => {
    try {
        res.status(200).json(`users GET`);
    } catch (error) {
        res.status(404).json({error: error.message});
    }  
};

const getUserByIdHandler = async (req, res) => {
    try {
        let {id} = req.params;
        res.status(200).json(`users/id/${id} GET ${id}`);
    } catch (error) {
        res.status(404).json({error: error.message});
    }  
};

const postUser = async (req, res) => {
    try {
        res.status(200).json(`users/register POST`);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
};

const getUserCheck = async (req, res) => {
    // Retorna true si existe el usuario con display name 
    try {
        const { displayName, email, password } = req.query;
        res.status(200).json(`users/check GET ${[displayName, email, password]}`);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
};

const postUserLogin = async (req, res) => {
    try {
        res.status(200).json(`users/login POST`);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
};

module.exports = { getUserHandler, getUserByIdHandler, postUser, getUserCheck, postUserLogin };