const {Event} = require('../../db.js');

const toggleEvent = async (id, userInfo) => {
    let event = await Event.findByPk(id);

    if( !event ) {
        throw Error("El evento no existe");
    }

    if( userInfo.isSeller && !userInfo.isAdmin ) {
        if( event.idSeller !== userInfo.id ) {
            throw Error("Este evento no le pertenenece.");
        }
    }

    event.active = !event.active;
    event.save();

    return event;
    
};

module.exports = toggleEvent;