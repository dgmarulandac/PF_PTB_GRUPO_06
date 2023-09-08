const { Event } = require("../../db");
const { Op } = require('sequelize');

const getAdminEvents = async (name) => {
    
    let whereClause = {};

	if(name){
        whereClause.name = { [Op.iLike]: `%${name}%` };
	}
	
    const allevents = await Event.findAll({
        where: whereClause
    });
    return allevents;
};

module.exports = getAdminEvents;