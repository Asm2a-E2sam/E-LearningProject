const userRoute=require("express").Router();
const bcrypt=require("bcrypt");
require("dotenv").config();

async function changePass(req,res,next){
    const saltString =await bcrypt.genSalt(10);
    req.body.password=await bcrypt.hash(req.body.password,saltString);
    next();
}

userRoute.post("/",changePass,(req,res)=>{
    console.log(req.body);
    res.json(req.body.password);
})
module.exports=userRoute;
