const TestAnalysis = require('../models/TestAnalysis');

exports.saveTestAnalysis = async (req, res) => {
  try {
    const { username,testName, score, accuracy,courseTitle } = req.body;

    const analysis = new TestAnalysis({
      username,
      testName,
      score,
      accuracy,
      courseTitle
    });

    await analysis.save();

    res.status(201).json({ message: 'Test analysis saved successfully!' });
  } catch (error) {
    console.error('Error saving test analysis:', error);
    res.status(500).json({ message: 'Failed to save test analysis' });
  }
};
