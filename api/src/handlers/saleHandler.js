const getSaleById = require("../controllers/Sale/getSales");


const getSaleByIdHandler = async (req, res) => {
    const { id } = req.params;  
    
    try {
        const saletById = await getSaleById(id);
        res.status(200).json(saletById);

    } catch (error) {
        res.status(404).send(error.message)
    }
};

module.exports = getSaleByIdHandler;