const User = require("../model/userSchema");
const booking=require("../model/booking");
const getUser = async (req, res) => {

    let data = await User.find()
    res.send(data)

}

const createUser = async (req, res) => {
  try {
    const { username, email, password, mobileno, age, gender, address, secretkey } = req.body;

    if (!username || !email || !password || !mobileno || !age || !gender || !address || !secretkey) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = new User({ username, email, password, mobileno, age, gender, address, secretkey });
    await user.save();

    res.status(201).json({ message: "User created", user });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};

const updateuser = async (req,res)=>{
    const id=req.params.id;
    const {name,email,password,mobileno,age,gender,address,secretkey}=req.body;

    let user;
    user=await User.findByIdAndUpdate(id,{name,email,password,mobileno,age,gender,address,secretkey});

    if(!user){
        res.status(500).json({message:"something wrong.."})
    }

    res.status(200).json({message:"updated succesfully.."})
}


const deleteuser=async(req,res)=>{
   const id=req.params.id;
   let user;
    user=await User.findByIdAndDelete(id);
    if(!user){
        res.status(500).json({message:"something wrong.."})
    }

    res.status(200).json({message:"delted succesfully.."})
}

const loginup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(404).json({ message: "User not found" });

    if (password !== existingUser.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login successful",
      user: existingUser
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const allbookinguser = async (req, res) => {
  try {
    const userId = req.params.id;

    const userBookings = await booking
      .find({ user: userId })
      .populate("movie"); // ✅ populate movie details

    return res.status(200).json({ bookings: userBookings });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};


const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // ❗ Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(id).select("secretkey");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error("Get user error:", err);
    res.status(500).json({
      message: "Failed to fetch user",
      error: err.message,
    });
  }
};

const verifyUser = async (req, res) => {
  try {
    const { email, secretkey } = req.body;

    if (!email || !secretkey) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email }).select("secretkey");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.secretkey !== secretkey) {
      return res.status(401).json({ message: "Invalid secret key" });
    }

    res.status(200).json({
      message: "Verification successful",
      userId: user._id,
    });
  } catch (err) {
    res.status(500).json({
      message: "Verification failed",
      error: err.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { userId, newPassword } = req.body;

    if (!userId || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = newPassword; // ⚠️ plaintext (bcrypt recommended later)
    await user.save();

    res.status(200).json({
      message: "Password reset successful",
    });
  } catch (err) {
    res.status(500).json({
      message: "Password reset failed",
      error: err.message,
    });
  }
};


module.exports = { getUser, createUser, updateuser, deleteuser, loginup, allbookinguser, getUserById, verifyUser, resetPassword}