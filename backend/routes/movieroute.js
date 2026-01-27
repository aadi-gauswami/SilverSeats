const { Router } = require("express");
const { addmovie, getallmovie, getmoviebyid, deletemovie, updatemovie } = require("../controllers/moviecontroller");



const movieroute = Router();
movieroute.get("/:id",getmoviebyid)
movieroute.get("/",getallmovie)
movieroute.post("/",addmovie)
movieroute.delete("/:id",deletemovie)
movieroute.patch("/:id",updatemovie)

module.exports={movieroute};