const getUsers = require("../controllers/User/getUsers");
const getUserById = require("../controllers/User/getUserById");
const postUser = require("../controllers/User/postUser");
const getUserCheck = require("../controllers/User/getUserCheck");
const postUserLogin = require("../controllers/User/postUserLogin");
const postAuth = require("../controllers/User/postAuth");

const getUserHandler = async (req, res) => {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({error: error.message});
    }  
};

const getUserByIdHandler = async (req, res) => {
    try {
        let {id} = req.params;
        const user = await getUserById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({error: error.message});
    }  
};

const postUserHandler = async (req, res) => {
    try {
        const {displayName, name, phone, email, nationality, address, isCompany, password} = req.body;
        const newUser = await postUser({displayName, name, phone, email, nationality, address, isCompany, password});
        res.status(201).json(newUser);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
};

const getUserCheckHandler = async (req, res) => {
    // Retorna true si existe el usuario con display name 
    try {
        const { displayName, email } = req.query;
        const response = await getUserCheck( displayName, email );
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
};

const postUserLoginHandler = async (req, res) => {
    try {
        // Debe retornar el JWT
        const { displayName, email, password, jwt, platform } = req.body;
        const response = await postUserLogin( {displayName, email, password, jwt, platform} );
        res.status(201).json(response);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
};

const postAuthHandler = async (req, res) => {
    try {
        const { jwt } = req.body;
        const response = await postAuth( jwt );
        res.status(201).json(response);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
};

module.exports = { getUserHandler, getUserByIdHandler, postUserHandler, getUserCheckHandler, postUserLoginHandler, postAuthHandler };