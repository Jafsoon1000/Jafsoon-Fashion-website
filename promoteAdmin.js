import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./backend/models/User.js";

dotenv.config({ path: "./backend/.env" });

const promoteAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Replace with your email
    const userEmail = "test@example.com"; 

    const user = await User.findOneAndUpdate(
      { email: userEmail },
      { isAdmin: true },
      { new: true }
    );

    if (user) {
      console.log(`Success! User ${user.email} is now an Admin.`);
    } else {
      console.log(`User not found with email: ${userEmail}. Please ensure you've registered and check the email.`);
    }
    
    process.exit();
  } catch (error) {
    console.error("Error connecting to DB:", error.message);
    process.exit(1);
  }
};

promoteAdmin();
