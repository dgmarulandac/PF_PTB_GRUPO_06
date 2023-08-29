const getCart = require ("../controllers/Carts/getCart");



const getCartsHandler = async (req, res) => {
    
    try {
        const carts = await getCart();
        res.status(200).json(carts);
    } catch (error) {
        res.status(404).send({error: "Error al enviar la data"});
    }
};

module.exports = {getCartsHandler};