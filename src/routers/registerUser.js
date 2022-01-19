const express = require('express')
const { registerUser } = require('../controllers/user')
const router = express.Router()

router.post('', registerUser)

module.exports = router