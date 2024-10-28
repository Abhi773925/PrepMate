const SignupDetails = require('../models/signupdetails'); 

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await SignupDetails.findOne({ username });

    if (user && user.password === password) {
      return res.status(200).json({ message: 'Login successful!' });
    }

    return res.status(401).json({ message: 'Invalid login credentials.' });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
