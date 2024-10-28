const express = require('express');
const router = express.Router();
const { getAllAccuracies} = require('../controllers/accuracyController'); 
router.get('/testanalyses', getAllAccuracies); 
module.exports = router; 
