const UserModel = require("../models/user-model.js");
const { CreateToken } = require("../utill/token-handler.js");
const bcrypt = require('bcryptjs');

module.exports.Welcome = async (req, res) => {
    res.json({ message: "Welcome to NASA API Backend!" });
};

module.exports.SignUp = async (req, res, next) => {
    try {
        const req_user = req.body;

        const hashedPassword = await bcrypt.hash(req_user.Password, 10);

        req_user.Password = hashedPassword;

        const result_user = await UserModel.create(req_user);

        if (!result_user) {
            return res.status(401).json({ message: "Error in signup" })
        } else {
            // const token = CreateToken(result_user);
            // res.setHeader('Authorization', `Bearer ${token}`);
            return res.status(201).json({ message: "User signed up successfully", success: true, user: result_user });
        }

        next();

    } catch (error) {

        return res.status(500).json({ message: "An error occurred when signing up", error: error.message });
    }
};

module.exports.SignIn = async (req, res, next) => {
    try {
        const { UserName, Password } = req.body;

        const result_user = await UserModel.findOne({ UserName });

        if (!result_user) {
            return res.status(401).json({ message: "User not found", success: false});
        }

        const isPasswordValid = await bcrypt.compare(Password, result_user.Password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password", success: false });
        }

        const token = CreateToken(result_user);
        res.setHeader('Authorization', `Bearer ${token}`);
        res.cookie('token', token, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 });

        return res.status(200).json({ message: "User signed in successfully", success: true, user: result_user, token: token });

        next();

    } catch (error) {
        return res.status(500).json({ message: "An error occurred when signing in", error: error.message });
    }
};



