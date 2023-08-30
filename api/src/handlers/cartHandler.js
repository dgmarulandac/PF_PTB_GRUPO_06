const getCart = require ("../controllers/Carts/getCart");
const getCartToken = require("../controllers/Carts/getCartToken");
const postCart = require("../controllers/Carts/postCart");
const updateCartQuantity = require("../controllers/Carts/putCart");



const getCartsHandler = async (req, res) => {
    
    try {
        const carts = await getCart();
        res.status(200).json(carts);
    } catch (error) {
        res.status(404).send({error: "Error al enviar la data"});
    }
};

const postCartsHandler = async (req, res) => {
    
    try {
        const id = req.id;
        const {items} = req.body;
        const cart = await postCart(id, items);
        res.status(200).json(cart);
    } catch (error) {
        res.status(404).send({error: "Error al enviar la data"});
    }
};

const getCartTokenHandler = async (req, res) => {
    
    try {
        const{token} = req.params
        const carttoken = await getCartToken(token);
        res.status(200).json(carttoken);
    } catch (error) {
        res.status(404).send({error: "Error al enviar la data"});
    }
};

const putCartTokenHandler = async (req, res) => {
    
    try {
        const putcart = await updateCartQuantity(req, res);
        res.status(200).json(putcart);
    } catch (error) {
        res.status(404).send({error: "Error al actualizar cantidad de eventos"});
    }
};

updateCartQuantity 

module.exports = {getCartsHandler, postCartsHandler, getCartTokenHandler, putCartTokenHandler };