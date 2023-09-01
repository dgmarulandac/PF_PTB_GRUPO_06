const { Review, Order, Sale } = require("../../db");

const postEventReview = async (req, res) => {
    try {

        const {
            score,
            comment,
            idEvent
        } = req.body;
        
        if (!score || !comment  || !idEvent) {
            return res.status(400).json({ error: "Faltan campos obligatorios" });
        }
        
        const orders = await Order.findAll({
            where: {idBuyer : req.id,
                   idEvent: idEvent
            },
            include:[Sale]
        });
       
        for(let i=0; i <orders.length; i++ ){
            if(orders[i].dataValues.Sale.dataValues.isSuccesful){
                
                    const createEventReview = await Review.create({
                        score,
                        comment,
                        approved: false,
                        idUser: req.id,
                        idEvent
                    })
                    

                    return res.status(200).json(createEventReview);  
            }}
        
        return res.status(404).json({ error: "Compra este evento para poder hacer una review" });
    
    
    } catch (error) {
        res.status(400).json({ error: "Hubo un error al crear la review" });
    }
};

module.exports = {postEventReview};
