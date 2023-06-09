const Router = require("express").Router();
const db = require("../../mysql-connector");
const { query_runner, create_error_object, done } = require("../helpers/db-functions");

Router.get("/", (req, res) => {
    query_runner("SELECT * FROM users")
                    .then(rows => res.status(200).render("signin_signup"))
                    .catch(err => res.status(500).render("error"))
    });
// Router.post("/", (req, res) => {
//     res.status(200).render("enroll");
// });

Router.post("/", (req, res) => {
        const data = [
                req.body.name,
                req.body.email,
                req.body.password,
        ];
        query_runner("INSERT INTO users \
        (name, email, password) \
        VALUES (?, ?, ?)", data)
        .then(row => res.status(200).render("signin_signup"))
        .catch(err => res.status(500).render("error"))
});

// Router.get("/", (req, res) => {
//         query_runner("SELECT * FROM author")
//                 .then(rows => res.status(200).render("users", {users: rows, page_title: "Users"}))
//                 .catch(err => res.status(500).json(create_error_object("db_error", err.message)))
// });

// Router.delete("/:id", (req, res) => {
//         query_runner("DELETE FROM author WHERE id > ?", [req.params.id])
//                 .then( ({affectedRows}) => res.status(200).json(affectedRows > 0 
//                                                                         ? done("user deleted successfully") 
//                                                                         : done("user doesn't exist")))
//                 .catch(err => res.status(500)
//                                         .json(create_error_object("db_error", err.message)));
// })

// Router.patch("/:id", (req, res) => {
//         const data = [req.body.username, req.body.email]
//         query_runner("UPDATE author SET username = ?, email = ? WHERE id = ?", [...data, req.params.id])
//         .then((rows) => {res.status(200).json(rows)})
//         .catch((err) => {res.sendStatus(500).json(create_error_object("db_error", err.message))});
// })

module.exports = Router;