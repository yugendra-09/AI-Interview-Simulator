const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (userData) => {
    console.log(userData);
    const { fullName, email, password } = userData;

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (existingUser) {
        throw new Error("Email already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
        data: {
            fullName,
            email,
            password: hashedPassword
        }
    });

   const { password: _, ...userWithoutPassword } = user;
return userWithoutPassword;
};
const loginUser = async (userData) => {
    const { email, password } = userData;

    // Find user by email
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!user) {
        throw new Error("User not found");
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid password");
    }

    // Generate JWT token
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );

    // Remove password before sending response
    const { password: _, ...userWithoutPassword } = user;

    return {
        token,
        user: userWithoutPassword
    };
};
module.exports = {
    registerUser,
    loginUser
};