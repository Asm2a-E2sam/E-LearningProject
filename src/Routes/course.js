const express = require("express");
const CourseRoute = express.Router();
const Course = require("../../models/Course");
const Admin = require("../../models/Admin");
const Enrollment = require("../../models/Enrollment");

CourseRoute.get("/:id", async (req, res) => {
  const course = await Course.findByPk(req.params.id);
  res.status(200).render("courses_details", { course });
});

CourseRoute.post("/:id", async (req, res) => {
  const admin = await Admin.findByPk(req.params.id);
  Course.create({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    price: req.body.price
  })
    .then(() => res.status(200).redirect(`/admin/${admin.id}`))
    .catch((err) => res.status(500).render("error"));
});

CourseRoute.patch("/courses/:id", async (req, res) => {
  const course = await Course.findByPk(req.params.id);
  course.name = req.body.name;
  course.description = req.body.description;
  course.image = req.body.image;
  course.price = req.body.price;
  job
    .save()
    .then(() => res.status(200).redirect(`/admins/`))
    .catch((err) => res.status(500).render("error"));
});

CourseRoute.post("/delete/:id", async (req, res) => {
  const course = await Course.findByPk(req.params.id);
  await Enrollment.destroy({ where: { course_id: req.params.id } });
  Course.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).redirect(`/admins/`))
    .catch((err) => res.status(500).render("error"));
});

module.exports = CourseRoute;
