const { Event } = require("../../db");

const getAdminEvents = async (req, res) => {

    const name = req.query.name
	
	const allevents = await Event.findAll();

	if(name){
		leteventsname = await allevents.filter(a => a.name.toLowerCase().includes(name.toLowerCase()));
		leteventsname.length ? 
		res.status(200).json(leteventsname):
		res.status(400).json('suerte')
	}else{
		res.status(200).send(allevents);
	}

};

module.exports = getAdminEvents;