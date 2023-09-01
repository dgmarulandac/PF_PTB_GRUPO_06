const  getDashboardUser = require("../controllers/Dashboard/getDashboardUserController");
const  putDashboardUser  = require("../controllers/Dashboard/putDashboardUserController");

const dashboardUserHandler = async (req, res) => {
    try {
        const id = req.id;
        const response = await getDashboardUser(id);
        res.status(200).json(response);

    } catch (error) {
        res.status(404).json({error: error.message});
    }
};


const dashboardPutUserHandler = async (req, res) => {
    try {
        const { id } = req.id;
        const { name, phone, identification, nationality, address, image} = req.body;
        const user = await putDashboardUser( id, { name, phone, identification, nationality, address, image} );
        res.status(201).json(user);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
};

module.exports = {dashboardUserHandler, dashboardPutUserHandler};