var mongoose = require('mongoose');

var csvSchema = new mongoose.Schema({
    floodname: {
        type: String

    },
    StartDate: {
        type: String,
        //   required:true,
        //   minlength:10,
        //   maxlength:2000
    },
    EndDate: {
        type: String,
        //  required:true,
        //  minlength:10,
        //  maxlength:2000
    },
    CountryName: {
        type: String,
        //  required:true,
        //  minlength:3,
        //  maxlength:2000
    }
    ,

    SatelliteName: {
        type: String,
        //  required:true,
        //  minlength:3,
        //  maxlength:2000
    }

    ,
    Latitude: {
        type: String,
    },
    Longitude: {
        type: String,
    },
    flooddata: {
        type: []
    },

});


const Flooddb = mongoose.model('floodrecords', csvSchema);


module.exports = Flooddb