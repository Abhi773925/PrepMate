const mongoose = require('mongoose');

const testAnalysisSchema = new mongoose.Schema({
  username:{type:String,required:true},
  testName: { type: String, required: true },
  score: { type: Number, required: true },
  accuracy: { type: Number, required: true },
  courseTitle: { type: String, required: true }

});

const TestAnalysis = mongoose.model('TestAnalysis', testAnalysisSchema);
module.exports = TestAnalysis;
