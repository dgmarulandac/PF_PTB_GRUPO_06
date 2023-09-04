const { Review, Event ,Sale, Order, Order_Event } = require("../../db");

const postEventReview = async (score, comment, idEvent, idBuyer) => {
    
    if (!score || !comment  || !idEvent || !idBuyer) {
        throw Error("Faltan campos obligatorios");
    }
    
    const orders = await Order.findAll({
        where: { idBuyer: idBuyer },
        include: [Order_Event, Sale]
    });

    console.log(orders);
    return null;
    
    for(let i=0; i <orders.length; i++ ){
        if(orders[i].dataValues.Sale.dataValues.isSuccesful){
            
                const createEventReview = await Review.create({
                    score,
                    comment,
                    approved: false,
                    idUser: idBuyer,
                    idEvent
                })
                

                return createEventReview;  
        }}
    
    throw Error("Compra este evento para poder hacer una review");
};

module.exports = {postEventReview};
