const { Review, Event ,Sale, Order } = require("../../db");

const postEventReview = async (score, comment, idEvent, idBuyer) => {
    
    if (!score || !comment  || !idEvent || !idBuyer) {
        throw Error("Faltan campos obligatorios");
    }
    
    const orders = await Order.findAll({
        where: { idBuyer: idBuyer },
        include: [Sale, Event]
    });
    
    for(let i=0; i <orders.length; i++ ){
        const order = orders[i].dataValues;
        if(order.Sale.dataValues.isSuccesful){
            for( let j=0; j < order.Events.length; j++ ) {
                const event = order.Events[j].dataValues;
                if( event.id === idEvent ) {
                    const createEventReview = await Review.create({
                        score,
                        comment,
                        approved: false,
                        idUser: idBuyer,
                        idEvent
                    })
                    return createEventReview;  
                }
            }
        }
    }
    
    throw Error("Compra este evento para poder hacer una review");
};

module.exports = {postEventReview};
