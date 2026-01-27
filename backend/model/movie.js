const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    actors:[{type:String}],
    releaseDate:{
        type:String,
    },
    posterurl:{
        type:String,
        reuired:true,
    },
    price:{
        type:Number,
        require:true,
    },
    featured:{
        type:Boolean,
    },
    bookings: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],
    admin:{
        type:mongoose.Types.ObjectId,
        ref: "Admin",
        reuired:true,
    }
})

let Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;