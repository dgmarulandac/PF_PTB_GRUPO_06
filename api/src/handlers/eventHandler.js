const {getEventFilterController} = require('../controllers/Event/getEventWithFilter')
const getEventById = require("../controllers/Event/getEventById");
const getMyEvents = require("../controllers/Event/getMyEvents");
const postEvent = require("../controllers/Event/postEvent");
const putEvent = require('../controllers/Event/putEvent');
const getAdminEvents = require('../controllers/Event/getAdminEvents');
const toggleEvent = require('../controllers/Event/toggleEvent');
const getAdminEventsForName = require('../controllers/Event/getAdminEventForName');


const getEventHandler = async (req, res) => {
    const { name, eventType, country, date, order } = req.query;
    try {
        const events = await getEventFilterController(name, eventType, country, date, order);
        res.status(200).json(events);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
};

const getEventByIdHandler = async (req, res) => {
    const { id } = req.params;  
    try {
        const eventById = await getEventById(id);
        res.status(200).json(eventById);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
};

const getMyEventHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const events = await getMyEvents(id,req.id);
        res.status(200).json(events);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
};

const getAdminEventsHandler = async (req, res) => {
    const {name} = req.query
    if(name){
        const events = await getAdminEventsForName(name)
        res.status(200).json(events)
    }else{
      const events = await getAdminEvents();
    res.status(200).json(events);  
    }
};

const toggleEventHandler = async (req, res) => {
    try {
        const {id} = req.params;
        const userId = req.id;
        const {isAdmin, isSeller} = req;
        const events = await toggleEvent(id, {userId, isAdmin, isSeller});
        res.status(200).json(events);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
};

const postCreateEventHandler = async (req, res) => {
    try {
        const { name, description, date, hour, cantTickets, address, country, image, eventType, ticketPrice, currency } = req.body;
        const event = await postEvent( { idSeller: req.id, name, description, date, hour, cantTickets, address, country, image, eventType, ticketPrice, currency } );
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: "Hubo un error al crear el evento: " + error.message });
    }
};

const putEventHandler = async (req, res) => {
    try {
        const userId = req.id;
        const {isAdmin, isSeller} = req;
        const {id} = req.params;
        const { name, description, date, hour, cantTickets, address, country, image, eventType, ticketPrice, currency } = req.body;
        const event = await putEvent( {userId, isAdmin, isSeller}, id, { name, description, date, hour, cantTickets, address, country, image, eventType, ticketPrice, currency } );
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: "Hubo un error al modificar el evento: " + error.message });
    }      
};
    

module.exports = { 
    getEventHandler,
    getEventByIdHandler,
    postCreateEventHandler,
    putEventHandler,
    getMyEventHandler,
    getAdminEventsHandler,
    toggleEventHandler
};