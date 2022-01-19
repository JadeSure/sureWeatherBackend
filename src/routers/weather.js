const express = require('express')
const { getCurrentWeather, getSevenWeather } = require('../controllers/weather')


const router = express.Router()

router.get('/:city&:stateCode', getCurrentWeather)
router.get('/:city', getCurrentWeather)



module.exports = router