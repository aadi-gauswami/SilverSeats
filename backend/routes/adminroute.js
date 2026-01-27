const { Router } = require("express");
const { getadmin, loginadmin } = require("../controllers/admincontroller");

const adminroute = Router();

adminroute.get("/", getadmin);
adminroute.post("/login", loginadmin);

module.exports = { adminroute };
