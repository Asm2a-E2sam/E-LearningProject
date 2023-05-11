const express = require("express");
const bcrypt = require("bcrypt");
const loginRoute = express.Router();
const User = require("../../models/User");
const Admin = require("../../models/Admin");

async function auth(req, res, next) {
  const dbModel =
    req.url.split("/")[1].charAt(0).toUpperCase() +
    req.url.split("/")[1].slice(1);
  const email = req.body.email;
  const password = req.body.password;

  const user = await eval(dbModel).findOne({ where: { email } });

  if (!user) {
    res.status(401).render("error");
    return;
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    res.status(401).render("error");
    return;
  }
  req.user = user;
  next();
}

loginRoute.get("/", async (req, res) => {
  if (req.cookies.session_id) {
    const user_sessoin = req.session.user;
    const admin = await Admin.findOne({ where: { email: user_sessoin.email } });
    if (admin) {
      res.status(200).redirect(`/admin/${user_sessoin.id}`);
      return;
    }
    const user = await User.findOne({ where: { email: user_sessoin.email } });
    if (user) {
      res.status(200).redirect(`/user/${user_sessoin.id}`);
      return;
    }
  }
  res.status(200).render("signin_signup");
});

loginRoute.post("/user", auth, async (req, res) => {
  req.session.user = req.user;
  res.cookie("session_id", req.session.id, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
  });
  res.status(200).redirect(`/user/${req.user.id}`);
});

loginRoute.post("/admin", auth, async (req, res) => {
  req.session.user = req.user;
  res.cookie("session_id", req.session.id, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
  });
  res.status(200).redirect(`/admin/${req.user.id}`);
});

module.exports = loginRoute;
