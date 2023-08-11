const { Router} = require ("express");
const {getEventHandler, getEventByIdHandler}  = require ("../handlers/eventHandler")

const eventRouter = Router ();

eventRouter.get("/", getEventHandler);
eventRouter.get("/:id",getEventByIdHandler);
eventRouter.post('/createEvent', async (req, res) => {
    let { 
        name, 
        description, 
        date, 
        hour, 
        cantTickets,  
        address,
        country,
        image,
        eventType,
    } = req.body
    let createEvent = await Event.create({
        name,
        description, 
        date, 
        hour, 
        cantTickets,  
        address,
        country,
        image,
        eventType,        
    })
    
    const resevt = await createEvent    
    return res.status(200).send(resevt)

});