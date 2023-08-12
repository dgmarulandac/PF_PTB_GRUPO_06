require("dotenv").config()
const {Event} = require("../../db")


const getDetail = async (req,res) => {

    const {id} = req.params
    try {
    const findEvent= await Event.findByPk(id)

    res.status(200).json(findEvent)
        
    } catch (error) {

        res. status(500).json({error:error.message})
    }
    
} 

module.exports={getDetail}