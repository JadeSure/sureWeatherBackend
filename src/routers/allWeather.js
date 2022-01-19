const express = require('express')
const { getSevenWeather, getStateCode } = require('../controllers/weather')

const router = express.Router()

router.get('/getStateCode', getStateCode)
router.get('/:city&:stateCode', getSevenWeather)
router.get('/:city', getSevenWeather)


module.exports = router