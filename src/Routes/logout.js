const express = require("express");
const logoutRoute = express.Router();

logoutRoute.post("/", async (req, res) => {
  req.session.destroy();
  res.clearCookie("session_id");
  res.status(200).redirect("/");
});

module.exports = logoutRoute;
