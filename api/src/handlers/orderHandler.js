const getOrderById = require('../controllers/Orders/getOrderById.js');
const postCreateOrder = require('../controllers/Orders/postOrder.js');

const postCreateOrdertHandler = async (req, res) => {
    try {
        const idBuyer = req.id;
        const { token } = req.body;
        const createorder= await postCreateOrder(idBuyer, token);
        res.status(200).json(createorder);
    } catch (error) {
        res.status(404).json({error: error.message})
    }
};

const getOrderByIdHandler = async (req, res) => {
    try {
        const { id } = req.params;  
        const ordertById = await getOrderById(id);
        res.status(200).json(ordertById);
    } catch (error) {
        res.status(404).json({error: error.message})
    }
};

module.exports = { postCreateOrdertHandler, getOrderByIdHandler}; 