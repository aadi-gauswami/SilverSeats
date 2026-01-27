const mongoose = require('mongoose');

const dbconnect = async()=>{
    await mongoose.connect("mongodb://localhost:27017/");
    console.log("db connected succsfulluy...");
}

module.exports=dbconnect