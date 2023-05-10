const {Router} = require("express");
const Admins = require("../../models/Admin")

const AdminRoute = Router();

AdminRoute.get("/", (req, res) => {
    req.model.findAll()
    .then(data => res.status(200).json(data))
    .then(data => res.status(500).render("error"));
});

AdminRoute.post("/", (req, res) => {
    req.model.create({ ...req.body })
    .then(data => res.status(200).json(data))
    .then(data => res.status(500).render("error"));
});

AdminRoute.delete("/:id", (req, res) => {
    req.model.destroy({ where: { id: req.params.id }})
    .then(data => res.status(200).json(data))
    .then(data => res.status(500).render("error"));
});

AdminRoute.put("/:id", (req, res) => {
    req.model.update({ ...req.body },{ where: { id: req.params.id }})
    .then(data => res.status(200).json(data))
    .then(data => res.status(500).render("error"));
});

module.exports = AdminRoute;
