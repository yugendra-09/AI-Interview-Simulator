const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");

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

module.exports = {
    registerUser
};