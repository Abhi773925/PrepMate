const express = require('express');
const { signup } = require('../controllers/signupcontrollers'); 

const router = express.Router();

router.post('/signupdetails', signup);

module.exports = router;
