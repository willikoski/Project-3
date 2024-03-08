const express = require('express')
const router = express.Router()
const { checkToken, dataController, apiController, updateUserBalance, getUser } = require('../../controllers/api/users')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

// POST /api/users
router.post('/', dataController.create, apiController.auth)
// POST /api/users/login
router.post('/login', dataController.login, apiController.auth)

// GET /api/users/:userId
router.get('/:userId', getUser);
router.put('/:userId/balance', updateUserBalance);
// GET /api/users/check-token
router.get('/check-token', ensureLoggedIn, checkToken)

module.exports = router