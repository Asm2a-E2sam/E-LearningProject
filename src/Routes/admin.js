const express = require("express");
const AdminRoute = express.Router();
const Admin = require("../../models/Admin");
const Course = require("../../models/Course");


AdminRoute.get("/:id", async (req, res) => {
  const admin = await Admin.findByPk(req.params.id);
  const courses = await Course.findAll();
  res.status(200).render("allcourses", { admin, courses });
});

AdminRoute.patch("/:id", async (req, res) => {
  const admin = await Admin.findByPk(req.params.id);
  admin.name = req.body.name;
  admin.email = req.body.email;
  admin.password = req.body.password;
  admin
    .save()
    .then(() => res.status(200).redirect(`/admins/${admin.id}`))
    .catch((err) => res.status(500).render("error"));
});

AdminRoute.delete("/:id", async (req, res) => {
  const admin = await Admin.findByPk(req.params.id);
  Admin
    .destroy()
    .then(() => res.status(200).redirect("/"))
    .catch((err) => res.status(500).render("error"));
});

AdminRoute.post("/edit/:id", (req, res) => {
  Admin.update(
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    },
    { where: { id: req.params.id } }
  )
    .then(() => res.status(200).redirect(`/admin/${req.params.id}`))
    .catch((err) => res.status(500).render("error"));
});

module.exports = AdminRoute;
