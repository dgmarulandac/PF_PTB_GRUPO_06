const getReviewById = require("../controllers/Reviews/getReviewsById");
const getReviews = require("../controllers/Reviews/getReviews");
const postEventReview = require ("../controllers/Reviews/postEventReviews");



const getReviewByIdHandler = async (req, res) => {
    try {
        let {id} = req.params;
        const review = await getReviewById(id);
        res.status(200).json(review);
    } catch (error) {
        res.status(404).json({error: "error"});
    }  
};

const getReviewsHandler = async (req, res) => {
    try {
        
        const reviews = await getReviews();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(404).json({error: "error"});
    }  
};

const  postReviewsHandler = async (req, res) => {
    try {
        const {score,comment,approved, userId} = req.body
        const newReviews = await postEventReview({score,comment,approved, userId});
        console.log(newReviews)
        res.status(200).json(newReviews);
    } catch (error) {
        console.log(error)
        res.status(404).json({ error: "Error al enviar info" });
    }  
};


module.exports={getReviewByIdHandler, getReviewsHandler, postReviewsHandler};