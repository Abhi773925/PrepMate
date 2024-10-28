const Test = require('../models/TestAnalysis'); 

exports.getAllAccuracies = async (req, res) => {
  try {
    const tests = await Test.find();
    const accuracies = tests.map(test => ({
      courseTitle: test.courseTitle,
      testName: test.testName,
      accuracy: test.accuracy,
      score: test.score,
      username: test.username, 
    })); 
    res.json(accuracies);
  } catch (error) {
    res.status(500).send(error);
  }
};
