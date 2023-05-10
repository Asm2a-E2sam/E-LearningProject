const {Router} = require("express");
const Courses = require("../../models/Course")

const CourseRoute = Router();

CourseRoute.get("/", (req, res) => {
    req.model.findAll()
    .then(data => res.status(200).json(data))
    .then(data => res.status(500).render("error"));
});

CourseRoute.post("/", (req, res) => {
    req.model.create({ ...req.body })
    .then(data => res.status(200).json(data))
    .then(data => res.status(500).render("error"));
});

CourseRoute.delete("/:id", (req, res) => {
    req.model.destroy({ where: { id: req.params.id }})
    .then(data => res.status(200).json(data))
    .then(data => res.status(500).render("error"));
});

CourseRoute.put("/:id", (req, res) => {
    req.model.update({ ...req.body },{ where: { id: req.params.id }})
    .then(data => res.status(200).json(data))
    .then(data => res.status(500).render("error"));
});

module.exports = CourseRoute;
