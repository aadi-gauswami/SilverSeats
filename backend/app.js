require("dotenv").config();
const express = require('express');
const dbconnect = require('./config/db');

const userroute = require('./routes/useroute');
const { adminroute } = require('./routes/adminroute');
const { movieroute } = require('./routes/movieroute');
const { bookroute } = require('./routes/bookroute');


const cors=require("cors")

const app= express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
app.get("/", (req, res) => {
    res.send("working...");
});

app.use("/user",userroute);
app.use("/admin",adminroute);
app.use("/movie",movieroute);
app.use("/booking",bookroute);

app.listen(5000,()=>{
    console.log("listing on port 5000");
    dbconnect();
})