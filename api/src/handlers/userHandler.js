const getUsers = require("../controllers/User/getUsers");
const getUserById = require("../controllers/User/getUserById");
const postUser = require("../controllers/User/postUser");
const getUserCheck = require("../controllers/User/getUserCheck");
const postUserLogin = require("../controllers/User/postUserLogin");

const getUserHandler = async (req, res) => {
    try {
        //getUsers
        res.status(200).json(`users GET`);
    } catch (error) {
        res.status(404).json({error: error.message});
    }  
};

const getUserByIdHandler = async (req, res) => {
    try {
        let {id} = req.params;
        //getUsersById
        res.status(200).json(`users/id/${id} GET ${id}`);
    } catch (error) {
        res.status(404).json({error: error.message});
    }  
};

const postUserHandler = async (req, res) => {
    try {
        //postUser
        res.status(200).json(`users/register POST`);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
};

const getUserCheckHandler = async (req, res) => {
    // Retorna true si existe el usuario con display name 
    try {
        const { displayName, email, password } = req.query;
        //getUserCheck
        res.status(200).json(`users/check GET ${[displayName, email, password]}`);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
};

const postUserLoginHandler = async (req, res) => {
    try {
        //postUserLogin
        res.status(200).json(`users/login POST`);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
};

module.exports = { getUserHandler, getUserByIdHandler, postUserHandler, getUserCheckHandler, postUserLoginHandler };