const { Router } = require('express')
const { Event } = require('../db.js');


const router = Router();

router.post('/createEvent', async (req, res) => {
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

})

router.get('/events', async (req, res) =>{
    const getEvent = await Event.findAll()
    return res. status(200).send(getEvent)
})

module.exports = router;

