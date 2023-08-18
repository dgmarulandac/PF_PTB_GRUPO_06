const {Orders} = require('../db.js');
const getOrdertById = require('../controllers/Orders/getOrderById.js');

const postCreateOrdertHandler = async (req, res) => {
    try {
        const { 
            idBuyer, 
            quantity, 
            price, 
            idEvent, 
            
        } = req.body;

        
        if (!idBuyer || !quantity || !price || !idEvent) {
            return res.status(400).json({ error: "Faltan campos obligatorios" });
        }

        const createOrder = await Orders.create({
            idBuyer, 
            quantity, 
            price, 
            idEvent,    
        });

        
        res.status(200).json(createOrder);
    } catch (error) {
        
        res.status(500).json({ error: "Hubo un error al crear la orden: " + error.message });
    }
};

const getOrderByIdHandler = async (req, res) => {
    const { id } = req.params;  
    
    try {
        const ordertById = await getOrdertById(id);
        res.status(200).json(ordertById);

    } catch (error) {
        res.status(404).send(error.message)
    }
};

module.exports = { postCreateOrdertHandler, getOrderByIdHandler}; 