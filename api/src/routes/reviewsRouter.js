const {Router} = require ("express");
const {getReviewByIdHandler, getReviewsHandler, postReviewsHandler} = require ("../handlers/reviewshandler");


const reviewsRouter = Router();

reviewsRouter.get("/", getReviewsHandler);
reviewsRouter.get("/:id", getReviewByIdHandler);
reviewsRouter.post("/createReview", postReviewsHandler);

module.exports = reviewsRouter;

