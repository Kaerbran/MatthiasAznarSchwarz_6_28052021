const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

//npm Library 'Express rate limiter'
const rateLimiter = require('../middleware/rate-limiter')

router.post('/signup', rateLimiter.createAccountLimiter , userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;