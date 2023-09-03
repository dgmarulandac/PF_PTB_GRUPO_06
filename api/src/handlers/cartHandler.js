const getCart = require ("../controllers/Carts/getCart");
const getCartToken = require("../controllers/Carts/getCartToken");
const postCart = require("../controllers/Carts/postCart");
const updateCartQuantity = require("../controllers/Carts/putCart");
const getCartUser = require("../controllers/Carts/getCartUser");

const getCartsHandler = async (req, res) => {
    
    try {
        const carts = await getCart();
        res.status(200).json(carts);
    } catch (error) {
        res.status(404).json({error: "Error al enviar la data"});
    }
};

const postCartsHandler = async (req, res) => {
    
    try {
        const id = req.id;
        const {items} = req.body;
        const cart = await postCart(id, items);
        res.status(200).json(cart);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
};

const getCartTokenHandler = async (req, res) => {
    
    try {
        const{token} = req.params
        const carttoken = await getCartToken(token);
        res.status(200).json(carttoken);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
};

const putCartTokenHandler = async (req, res) => {
    
    try {
        const putcart = await updateCartQuantity(req, res);
        
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const getCartUserHandler = async (req, res) => {
    
    try {
        const id = req.id;
        const cartuser= await getCartUser(id);
        res.status(200).json(cartuser);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
};

module.exports = {getCartsHandler, postCartsHandler, getCartTokenHandler, putCartTokenHandler, getCartUserHandler };