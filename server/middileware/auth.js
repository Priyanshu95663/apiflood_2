const jwt = require("jsonwebtoken")
const Registerdb = require("../model/register")

const auth = async(req,res,next)=>{
    try{
       // console.log("look here", req);
        //console.log("here", req.headers.cookie)
        const token = req.headers.cookie.split("jwt=")[1];
        console.log("token",token)
        const verifyUser = jwt.verify(token , process.env.SECRET_KEY);
        console.log(verifyUser);
        const user = await Registerdb.findOne({_id:verifyUser._id})
        console.log(user);
        next();
    }catch(error){
        console.log(error)
        res.status(401).send(error);
    }
}

module.exports =auth;