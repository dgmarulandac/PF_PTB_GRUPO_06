
const getDashboardUserController = require("../controllers/Dashboard/getDashboardUserController");

const dashboardUserHandler = async (req, res) => {
    try {
        const id = req.id;
        const response = await getDashboardUserController(id);
        res.status(200).json(response);

    } catch (error) {
        res.status(404).json({error: error.message});
    }
};


module.exports = {dashboardUserHandler};