const getReviewById = require("../controllers/Reviews/getReviewsById");
const getReviewsAdmin = require("../controllers/Reviews/getReviewsAdmin");
const {postEventReview} = require ("../controllers/Reviews/postEventReviews");
const putReviews = require("../controllers/Reviews/putReviews");



const getReviewByIdHandler = async (req, res) => {
    try {
        let {id} = req.params;
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
        res.status(500).json({error: error.message});
    }  
};

const  postReviewsHandler = async (req, res) => {
    try {
        const { score, comment, idEvent } = req.body;
        const idBuyer = req.id;
        const newReviews = await postEventReview(score, comment, idEvent, idBuyer);
       res.status(200).json(newReviews);
    } catch (error) {
        res.status(403).json({ error: error.message });
    }  
};

const  putReviewsHandler = async (req, res) => {
    try {
        const {id} = req.params
        const putreviews = await putReviews(id);
        res.status(200).json(putreviews);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }  
};


module.exports={getReviewByIdHandler, getReviewsAdminHandler, postReviewsHandler, putReviewsHandler};