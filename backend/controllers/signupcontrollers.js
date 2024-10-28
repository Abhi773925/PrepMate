const SignupDetail = require('../models/signupdetails'); 

exports.signup = async (req, res) => {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const newSignupDetail = new SignupDetail({ name, username, email, password });
        await newSignupDetail.save();
        res.status(201).json({ message: "Signup successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
