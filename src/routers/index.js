const express = require('express');
const userRegisterRouter = require('./registerUser')
const userLoginRouter = require('./loginUser')
const userModifyPasswordRouter = require('./loginUser')
const weatherRouter = require('./weather')
const allWeathersRouter = require('./allWeather')
const authGuard = require('../middleware/authGuard')


const router = express.Router();

router.use('/registerUsers', userRegisterRouter);
router.use('/loginUsers', userLoginRouter)
router.use('/loginUsers', userModifyPasswordRouter)

router.use('/weathers', weatherRouter)
router.use('/allWeathers', authGuard, allWeathersRouter)


module.exports = router;