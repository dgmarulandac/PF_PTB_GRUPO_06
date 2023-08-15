const {getEventFilterController} = require('../controllers/Event/getEventWithFilter')
const getEventById = require("../controllers/Event/getEventById");
const {Event} = require('../db.js');


const getEventHandler = async (req, res) => {
    const { name, eventType, country, date, order } = req.query;
    try {
        const events = await getEventFilterController(name, eventType, country, date, order);
        res.status(200).json(events);
    } catch (error) {
        res.status(404).send(error.message);
    }
};

const getEventByIdHandler = async (req, res) => {
    const { id } = req.params;  
    try {
        const eventById = await getEventById(id);
        res.status(200).json(eventById);
    } catch (error) {
        res.status(404).send(error.message)
    }
};

const postCreateEventHandler = async (req, res) => {
    try {
        const { 
            name, 
            description, 
            date, 
            hour, 
            cantTickets,  
            address,
            country,
            image,
            eventType,
            ticketPrice,
        } = req.body;

        
        if (!name || !date || !hour || !cantTickets || !address || !country || !ticketPrice) {
            return res.status(400).json({ error: "Faltan campos obligatorios" });
        }

        const createEvent = await Event.create({
            name, 
            description, 
            date, 
            hour, 
            cantTickets,  
            address,
            country,
            image,
            eventType,
            ticketPrice,      
        });

        
        res.status(200).json(createEvent);
    } catch (error) {
        
        res.status(500).json({ error: "Hubo un error al crear el evento: " + error.message });
    }
};

module.exports = { getEventHandler, getEventByIdHandler, postCreateEventHandler};