const getSaleById = require("../controllers/Sale/getSaleById");
const getMySales = require("../controllers/Sale/getMySales");

const getMySalesHandler = async (req, res) => {
    try {
        const id = req.id;
        const response = await getMySales( id );
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
};

const getSaleByIdHandler = async (req, res) => {
    try {
        const { id } = req.params;  
        const saleById = await getSaleById(id);
        res.status(200).json(saleById);
        
   } catch (error) {
        res.status(404).json({error: error.message});
    }
};

module.exports = {getSaleByIdHandler, getMySalesHandler};