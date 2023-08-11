const {Router} = require('express')
const { getDetail } = require('../controllers/Detail/GetDetail')

const router = Router()

router.get("/:id", getDetail )


module.exports= router