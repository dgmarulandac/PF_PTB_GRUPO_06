const getOrderById = require('../controllers/Orders/getOrderById.js');
const postCreateOrder = require('../controllers/Orders/postOrder.js');



const postCreateOrdertHandler = async (req, res) => {
    try {
        const createorder= await postCreateOrder(req, res);
        res.status(200).json(createorder);

    } catch (error) {
        res.status(404).send(error.message)
    }
};

const getOrderByIdHandler = async (req, res) => {
    const { id } = req.params;  
    
    try {
        const ordertById = await getOrderById(id);
        res.status(200).json(ordertById);

    } catch (error) {
        res.status(404).send(error.message)
    }
};



module.exports = { postCreateOrdertHandler, getOrderByIdHandler}; 
