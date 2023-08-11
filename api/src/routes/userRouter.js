const {Router} = require("express");

const getUsers = require("../controllers/User/getUsers");

const userRouter = Router();

userRouter.get("/", async(req,res) => {
    try {
        res.status(200).json("user GET");
    } catch (error) {
        res.status(404).json({error: error.message});
    }
});

userRouter.get("/:id", async(req,res) => {
    try {
        let {id} = req.params;
        res.status(200).json(`user GET ${id}`);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
});