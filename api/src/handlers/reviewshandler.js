const getReviewById = require("../controllers/Reviews/getReviewsById");
const getReviewsAdmin = require("../controllers/Reviews/getReviewsAdmin");
const {postEventReview} = require ("../controllers/Reviews/postEventReviews");
const putReviews = require("../controllers/Reviews/putReviews");



const getReviewByIdHandler = async (req, res) => {
    try {
        let {id} = req.params;
        console.log(id);
        const review = await getReviewById(id);
        res.status(200).json(review);
    } catch (error) {
        res.status(404).json({error: "error"});
    }  
};

const getReviewsAdminHandler = async (req, res) => {
    try {
        const reviews = await getReviewsAdmin();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(404).json({error: "error"});
    }  
};

const  postReviewsHandler = async (req, res) => {
    try {
        const newReviews = await postEventReview(req, res);
       
    } catch (error) {
        console.log(error)
        res.status(404).json({ error: "Error al enviar info" });
    }  
};

const  putReviewsHandler = async (req, res) => {
    try {
        const {id} = req.params
        const putreviews = await putReviews(id);
       res.status(200).json(putreviews);
    } catch (error) {
        console.log(error)
        res.status(404).json({ error: "Error al enviar info" });
    }  
};


module.exports={getReviewByIdHandler, getReviewsAdminHandler, postReviewsHandler, putReviewsHandler};