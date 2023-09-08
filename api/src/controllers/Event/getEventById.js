const { Event } = require("../../db");
const getMyPurchases = require("../Sale/getMyPurchases");

const getEventById = async (id, userId) => {
    const event = await Event.findByPk(id);

    // Agrega logica de si compro
    let comentable = false;
    if( userId ) {
        const purchases = await getMyPurchases(userId);
        purchases.forEach(purchase => {
            purchase.dataValues.Events.forEach( event => {
                if( event.dataValues.id === id ) {
                    comentable = true;
                    return;
                }
            });
            if( comentable ) {
                return;
            }
        });
    }

    const aRetornar = {...event.dataValues, comentable };

    return aRetornar;
};

module.exports = getEventById;
