const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/user");

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected ✅");

        const email = "admin@ecommerce.com";

        const existingAdmin = await User.findOne({ email });

        if (existingAdmin) {
            console.log("Admin already exists.");
            process.exit();
        }

        const hashedPassword = await bcrypt.hash(
            "Admin@123",
            10
        );

        const admin = await User.create({
            name: "Admin",
            email,
            password: hashedPassword,
            role: "admin"
        });

        console.log("Admin created successfully ✅");
        console.log("Email:", admin.email);
        console.log("Role:", admin.role);

        process.exit();

    } catch (error) {
        console.error("Error creating admin:", error);
        process.exit(1);
    }
};

createAdmin();