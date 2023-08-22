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
            currency,
            sellerId
        } = req.body;

        console.log(currency)
        if (!name || !date || !hour || !cantTickets || !address || !country || !ticketPrice || !currency || !sellerId) {
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
            currency,
            sellerId   
        });

        
        res.status(200).json(createEvent);
    } catch (error) {
        
        res.status(500).json({ error: "Hubo un error al crear el evento: " + error.message });
    }
};

const putEventHandler = async (req, res, next) => {
    try{
        let event = await Event.findByPk(req.params.id);
    
        if(!event){
            return res.json({
                success:false,
                message: "Order ID doesn't exist"
            });
        }else{
            
            let updateEvent = await event.update({
                    name: req.body.name, 
                    description: req.body.description, 
                    date: req.body.date, 
                    hour: req.body.hour, 
                    cantTickets: req.body.cantTickets,  
                    address: req.body.address,
                    country: req.body.country,
                    image: req.body.image,
                    eventType: req.body.eventType,
                    ticketPrice: req.body.ticketPrice, 
                    currency: req.body.currency
            });
    
            res.json({
                success: true,
                message:" order update successfully",
                event: updateEvent
    
            });
        }
    
    }catch (error){
        next(error)
    
    }
        
    }
    

module.exports = { getEventHandler, getEventByIdHandler, postCreateEventHandler, putEventHandler};