const express = require('express')
const { loginUser } = require('../controllers/user')
const { modifyPasswordUser } = require('../controllers/user')
const router = express.Router()

router.post('', loginUser)
router.put('/:id', modifyPasswordUser)

module.exports = router