const { Router } = require("express");
const { newbooking, updatebooking, deletebooking, getallbookings, getBookingsByUser, getReservedSeats } = require("../controllers/bookcontroller");

const bookroute = Router();

bookroute.get("/reserved-seats", getReservedSeats);
bookroute.get("/user/:userId", getBookingsByUser);
bookroute.get("/", getallbookings);
bookroute.post("/", newbooking);
bookroute.patch("/:id", updatebooking);
bookroute.delete("/delete/:id", deletebooking);


module.exports={bookroute};