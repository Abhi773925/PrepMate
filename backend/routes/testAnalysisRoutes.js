const express = require('express');
const router = express.Router();
const { saveTestAnalysis } = require('../controllers/testAnalysisController');

router.post('/testanalyses', saveTestAnalysis); 

module.exports = router;
