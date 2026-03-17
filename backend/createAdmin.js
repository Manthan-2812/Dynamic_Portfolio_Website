require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGODB_URI);

async function createAdmin() {

  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

  const admin = new Admin({
    email: process.env.ADMIN_EMAIL,
    password: hashedPassword
  });

  await admin.save();

  console.log("Admin created");

  process.exit();
}

createAdmin();