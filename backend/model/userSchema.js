const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    mobileno:{
        type:Number,
        require:true
    },
    age:{
        type:Number,
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    secretkey:{
        type:String,
        require:true
    },
    bookings:[{type:mongoose.Types.ObjectId,ref:"booking"}]
})

let User = mongoose.model("User", UserSchema);
module.exports = User;