const {Router} = require('express')
const { getDetail } = require('../controllers/Detail/getDetail.js')

const router = Router()

router.get("/:id", getDetail )


module.exports= router