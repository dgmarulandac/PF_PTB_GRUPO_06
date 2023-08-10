const { getEvent, searchById, searchByName } = require('../controllers/Event/getEventController')


const getEventHandler = async (req, res) => {
    const { name } = req.query;
    try {
        const events = name ? await searchByName(name) : await getEvent()
        res.status(200).json(events)
    } catch (error) {
        res.status(404).send(error.message)
    }
};

const getEventByIdHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const eventById = await searchById(id)
        res.status(200).json(eventById)
    } catch (error) {
        res.status(404).send(error.message)
    }
};

module.exports = { getEventHandler, getEventByIdHandler, searchByName }