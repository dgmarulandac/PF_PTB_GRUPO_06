const { Event } = require("../../db");
const { Op } = require('sequelize');

const getEventFilterController = async (
  name,
  eventType,
  country,
  date,
  order,
  sortOrder // Nuevo parámetro para el orden descendente o ascendente
) => {
	const whereClause = {cantTickets: {[Op.gt]: 0}, active: true};

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
  sortOrder = sortOrder ? sortOrder : "ASC";
  if (order) {
    switch (order) {
      case "name":
        orderClause.push(["name", sortOrder]); // Ordena por nombre en orden ascendente o descendente
        break;
      case "date":
        orderClause.push(["date", sortOrder]); // Ordena por fecha 
        break;
      case "eventType":
        orderClause.push(["eventType", sortOrder]); // Ordena por tipo de evento 
        break;
      case "country":
        orderClause.push(["country", sortOrder]); // Ordena por país 
        break;
      case "ticketPrice":
        orderClause.push(["ticketPrice", sortOrder]); // Ordena por precio del ticket 
        break;
      default:
        break;
    }
  }

  const events = await Event.findAll({
    where: whereClause,
    order: orderClause
  });

  return events;
};

module.exports = { getEventFilterController };