const authService = require("../services/authService");

const register = async (req, res) => {
    try {
        console.log(req.body);
        const user = await authService.registerUser(req.body);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
const login = async (req, res) => {
    try {
        const result = await authService.loginUser(req.body);

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: result
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
const getProfile = async (req, res) => {
    try {

        res.status(200).json({
            success: true,
            message: "Profile fetched successfully",
            data: req.user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    register,
    login,
    getProfile
};