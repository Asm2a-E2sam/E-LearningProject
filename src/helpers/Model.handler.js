const User = require("../../models/User");
const Course = require("../../models/Course");
const Admin = require("../../models/Admin");

module.exports.HandleDBModel = function (req, res, next){
    const route = req.url.split("/")[1];
    if (route == "users") {
        req.model = User;
    }
    else if (route == "courses") {
        req.model = Course;
    }
    else if (route == "admins") {
        req.model = Admin;
    }
    next();
}