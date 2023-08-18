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

const putOrderHandler = async (req, res, next) => {
try{
    let order = await Orders.findByPk(req.params.id);

    if(!order){
        return res.json({
            success:false,
            message: "Order ID doesn't exist"
        });
    }else{
        let orders = await Orders.findByPk(req.params.id);
        console.log(orders);
        let updateOrder = await orders.update({
            quantity: req.body.quantity
        });

        res.json({
            success: false,
            message:" order update successfully",
            order: updateOrder

        });
    }

}catch (error){
    next(error)

}
    
}

module.exports = { postCreateOrdertHandler, getOrderByIdHandler, putOrderHandler}; 