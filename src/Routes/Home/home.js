const mysql = require('mysql2');
const express = require('express');
const app = express();
const homeRouter =express.Router();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', userRoute);

homeRouter.get("/",(req,res)=>{

      res.status("200").render("home");
})

module.exports= homeRouter;