var mongoose  =  require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const jwt = require("jsonwebtoken");
require('dotenv').config();
var csvSchema = new mongoose.Schema({
     username : {
          type : String,
          required:true,
          unique : true
     },
  email: {
              type : String,
              required:true,
              unique:true
            
         },
 password:{       
                  type:String,
                  required:true
              
             },
     tokens:[{
           token:{
                type:String,
                reqired:true
           }
     }]
});

//csvSchema.plugin(passportLocalMongoose);
//generating token
csvSchema.methods.generateAuthToken = async function(){
     try{
          const token = jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY);
          this.tokens=this.tokens.concat({token:token});
          await this.save();
          console.log(token);
          return token;
     }catch(error){
               res.send("this is error part");
               console.log(error);
     }
}



const Registerdb =mongoose.model('Registers',csvSchema);
 



module.exports = Registerdb