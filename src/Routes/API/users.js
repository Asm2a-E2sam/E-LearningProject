const {Router} = require("express");
const Users = require("../../../models/User")

const UserRoute = Router();

UserRoute.get("/", (req, res) => {
    req.model.findAll()
    .then(data => res.status(200).json(data))
    .then(data => res.status(500).render("error"));
});

UserRoute.post("/", (req, res) => {
    req.model.create({ ...req.body })
    .then(data => res.status(200).json(data))
    .then(data => res.status(500).render("error"));
});

UserRoute.delete("/:id", (req, res) => {
    req.model.destroy({ where: { id: req.params.id }})
    .then(data => res.status(200).json(data))
    .then(data => res.status(500).render("error"));
});

UserRoute.put("/:id", (req, res) => {
    req.model.update({ ...req.body },{ where: { id: req.params.id }})
    .then(data => res.status(200).json(data))
    .then(data => res.status(500).render("error"));
});

module.exports = UserRoute;
