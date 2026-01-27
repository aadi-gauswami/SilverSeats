const Admin = require("../model/adminSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const getadmin = async (req, res) => {
  const admins = await Admin.find();
  res.status(200).json(admins);
};

const loginadmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Admin not found" });
    }

    if (password !== admin.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      adminId: admin._id
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
};

module.exports = { getadmin, loginadmin };
