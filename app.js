const express = require("express")
const bodyParser = require("body-parser");
const multer = require("multer");
const forms = multer();
const app = express();
const users = require("./src/Routes/Users/users");
const home = require("./src/Routes/Home/home");
const path = require("path");
const courses = require("./src/Routes/Courses/courses");
const HomeRouter = require("./src/Routes/Main");

app.use(express.static(__dirname + '/public'));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.set("views", path.join(process.cwd(), "views"))

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(forms.array());
app.use(HomeRouter);
app.use("/users", users);
app.use("/courses", courses);
app.use("/home", home);


app.get("*", (req, res) => {
        console.log("Request Objected have been changed from middleware", req.myname);
        res.status(404).json({
                error: "Page not found", 
                status_code: 404
        });
});

app.listen(8080, 'localhost', function () {
        console.log("server is up & running")
})

module.exports = app
