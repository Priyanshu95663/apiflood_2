var mongoose  =  require('mongoose');
var twitSchema =new mongoose.Schema({
    
             CountryName:{
                 type:String,
                //  required:true,
                //  minlength:3,
                //  maxlength:2000
               }
              ,

          twitdata:{
        type: []
    },
  
});


const Twitdb=mongoose.model('alltwitdata',twitSchema);
module.exports=Twitdb