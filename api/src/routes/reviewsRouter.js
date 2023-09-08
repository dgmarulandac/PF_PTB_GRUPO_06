const {Router} = require ("express");
const {getReviewByIdHandler, getReviewsAdminHandler, postReviewsHandler, putReviewsHandler} = require ("../handlers/reviewshandler");

const { verifyToken, isAdmin, isSeller } = require("../middleware/authJwt");

const reviewsRouter = Router();

reviewsRouter.get("/admin", [verifyToken, isAdmin], getReviewsAdminHandler);
reviewsRouter.get("/:id", getReviewByIdHandler);
reviewsRouter.post("/createReview",[verifyToken],postReviewsHandler);
reviewsRouter.put("/putReview/:id",[verifyToken, isAdmin], putReviewsHandler);

module.exports = reviewsRouter;

