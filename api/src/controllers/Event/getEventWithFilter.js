// const { Event } = require("../../db");
// const { Op } = require('sequelize');


// const getEventFilterController = async (
// 	name,
// 	eventType,
// 	country,
// 	date,
// 	order
// ) => {
// 	const whereClause = {cantTickets: {[Op.gt]: 0}};

// 	if (name) {
// 		whereClause.name = { [Op.iLike]: `%${name}%` };
// 	}
// 	if (eventType) {
// 		whereClause.eventType = eventType;
// 	}
// 	if (country) {
// 		whereClause.country = country;
// 	}
// 	if (date) {
// 		whereClause.date = { [Op.eq]: date };
// 	}

// 	const orderClause = [];
// 	if (order) {
// 		switch (order) {
// 			case "name":
// 				orderClause.push(["name", "ASC"]); // Ordena por nombre en orden ascendente
// 				break;
// 			case "date":
// 				orderClause.push(["date", "ASC"]); // Ordena por fecha en orden ascendente
// 				break;
// 			case "eventType":
// 				orderClause.push(["eventType", "ASC"]); // Ordena por tipo de evento en orden ascendente
// 				break;
// 			case "country":
// 				orderClause.push(["country", "ASC"]); // Ordena por país en orden ascendente
// 				break;
// 			case "price":
// 				orderClause.push(["ticketPrice", "ASC"]); // Ordena por precio del ticket en orden ascendente
// 				break;
// 			default:
// 				break;
// 		}
// 	}

// 	const events = await Event.findAll({
// 		where: whereClause,
// 		order: orderClause.length > 0 ? orderClause : undefined,
// 	});

// 	return events;
// };

// module.exports = { getEventFilterController };

const { Event } = require("../../db");
const { Op } = require('sequelize');

const getEventFilterController = async (
  name,
  eventType,
  country,
  date,
  order,
  ticketPrice,
  sortOrder // Nuevo parámetro para el orden descendente o ascendente
) => {
  const whereClause = { cantTickets: { [Op.gt]: 0 } };

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
  if (ticketPrice) {
    whereClause.ticketPrice = { [Op.eq]: ticketPrice };
  }

  const orderClause = [];
  if (order) {
    switch (order) {
      case "name":
        orderClause.push(["name", sortOrder || "ASC"]); // Ordena por nombre en orden ascendente o descendente
        break;
      case "date":
        orderClause.push(["date", sortOrder || "ASC"]); // Ordena por fecha 
        break;
      case "eventType":
        orderClause.push(["eventType", sortOrder || "ASC"]); // Ordena por tipo de evento 
        break;
      case "country":
        orderClause.push(["country", sortOrder || "ASC"]); // Ordena por país 
        break;
      case "ticketPrice":
        orderClause.push(["ticketPrice", sortOrder || "ASC"]); // Ordena por precio del ticket 
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