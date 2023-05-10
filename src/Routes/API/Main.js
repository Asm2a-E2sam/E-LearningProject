const express = require("express")
const MainRouter = express.Router();

const UserRouter = require("./users");
const AdminRouter = require("./admins");
const CourseRouter = require("./courses");

MainRouter.use("/admins",AdminRouter);
MainRouter.use("/users",UserRouter);
MainRouter.use("/courses",CourseRouter);

MainRouter.get("/", (req, res) => {
        res.status(200).json({
                status: 200,
                error: 0
        });
});

module.exports = MainRouter

