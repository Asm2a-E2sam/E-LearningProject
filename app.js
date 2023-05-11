const express = require("express")
const bodyParser = require("body-parser");
const { HandleDBModel } = require("./src/helpers/Model.handler");
const multer = require("multer");
 const HomeRouter = require("./src/Routes/API/Main");
const forms = multer();
const app = express();
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const MySQLStore = require("express-mysql-session")(expressSession);
const mysql = require("mysql");
const {join: pathjo} = require("path");

// const RegisterRoute = require("./src/Routes/register");
const LoginRoute = require("./src/Routes/login");
const LogoutRoute = require("./src/Routes/logout");
const CourseRoute = require("./src/Routes/course");
const AdminRoute = require("./src/Routes/admin");
const UserRoute = require("./src/Routes/user");
const Course = require("./models/Course");

const APIRouter = require("./src/Routes/API/Main");



app.use(express.static(pathjo(__dirname, "public", "css")));
app.use(express.static(pathjo(__dirname, "public", "js")));

app.set("view engine", "ejs");
app.set("views", pathjo(__dirname , "views"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(forms.array());
app.use(HandleDBModel);

app.use("/users", UserRoute);
app.use("/courses", CourseRoute);
app.use("/admins", AdminRoute);
app.use("/api", APIRouter);
// app.use("/register", RegisterRoute);
app.use("/login", LoginRoute);
app.use("/logout", LogoutRoute);


app.get("/", async (req, res) => {
        const courses = await Course.findAll();
        res.render("home")
});

app.get("*", (req, res) => {
        res.status(404).render("error");
});
      

app.listen(8080, 'localhost', function () {
        console.log("server is up & running")
})

module.exports = app
