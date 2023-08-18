const { Event } = require("../../db");
const { Op } = require('sequelize');


const getEventFilterController = async (
	name,
	eventType,
	country,
	date,
	order
) => {
	const whereClause = {};

	if (name) {
		whereClause.name = { [Op.iLike]: `%${name}%` };
	}
	if (eventType) {
		whereClause.eventType = eventType;
	}
	if (country) {
		whereClause.country = country;
	}
	if (date) {
		whereClause.date = { [Op.eq]: date };
	}

	const orderClause = [];
	if (order) {
		switch (order) {
			case "name":
				orderClause.push(["name", "ASC"]); // Ordena por nombre en orden ascendente
				break;
			case "date":
				orderClause.push(["date", "ASC"]); // Ordena por fecha en orden ascendente
				break;
			case "eventType":
				orderClause.push(["eventType", "ASC"]); // Ordena por tipo de evento en orden ascendente
				break;
			case "country":
				orderClause.push(["country", "ASC"]); // Ordena por país en orden ascendente
				break;
			case "price":
				orderClause.push(["ticketPrice", "ASC"]); // Ordena por precio del ticket en orden ascendente
				break;
			default:
				break;
		}
	}

	const events = await Event.findAll({
		where: whereClause,
		order: orderClause.length > 0 ? orderClause : undefined,
	});

	return events;
};

module.exports = { getEventFilterController };