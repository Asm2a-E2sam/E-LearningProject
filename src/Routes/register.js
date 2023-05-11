const express = require("express");
const bcrypt = require("bcrypt");
const Admin = require("../../models/Admin");
const User = require("../../models/User");
const RegisterRoute = express.Router();

async function changePass(req,res,next){
    const saltString =await bcrypt.genSalt(10);
    req.body.password=await bcrypt.hash(req.body.password,saltString);
    next();
}

RegisterRoute.get("/", (req, res) => {
  res.status(200).render("register");
});

RegisterRoute.post("/admin", hashPassword, (req, res) => {
  Admin.create({ ...req.body })
    .then(() => res.status(200).redirect("/login"))
    .catch((err) => res.status(500).render("error"));
});

RegisterRoute.post("/user", hashPassword, (req, res) => {
  User.create({ ...req.body })
    .then(() => res.status(200).redirect("/login"))
    .catch((err) => res.status(500).render("error"));
});

module.exports = RegisterRoute;
