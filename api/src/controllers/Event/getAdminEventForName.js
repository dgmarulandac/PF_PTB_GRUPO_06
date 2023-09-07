const { Event } = require("../../db");
const { Op } = require('sequelize');

const getAdminEventsForName = async (name) => {

    const whereClause={}

    if (name) {
		whereClause.name = { [Op.iLike]: `%${name}%` };
	}

    const events = await Event.findAll({
		where: whereClause
	});

	return events;

};

module.exports = getAdminEventsForName;