var mongoose  =  require('mongoose');
var weblinkSchema =new mongoose.Schema({
    
             CountryName:{
                 type:String,
                //  required:true,
                //  minlength:3,
                //  maxlength:2000
               }
              ,

           weblinkdata:{
        type: []
    },
  
});


const Weblinkdb=mongoose.model('floodlistweblinks',weblinkSchema);
module.exports=Weblinkdb