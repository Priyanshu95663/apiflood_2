const express = require('express');
const route = express.Router()
const   model = require('../model/model');
const  weblinkmodel = require('../model/weblinkmodel');
const  twitmodel = require('../model/twitmodel');
const  registerdb = require('../model/register');
const services = require('../services/render');
 const cookieParser =require("cookie-parser")
 const axios = require('axios');
 const auth = require("../middileware/auth")
// const controller = require('../controller/controller');

// const weblinkcontrol = require('../controller/weblinkcontrol');
 
/**
 *  @description Root Route
 *  @method GET /
 */
 
route.get('/', services.homeRoutes);
route.get('/allfloods',auth, (req,res) =>{
    axios.get('https://agile-hollows-34401.herokuapp.com/api/flood')
    .then(function(response){
       // res.send(response);
        res.render('index', { floods : response.data });
    })
    .catch(err =>{
        res.send(err);
    })
});
 
/**
 *  @description add flood
 *  @method GET /add-flood
 */
route.get('/add-flood', services.add_flood)
route.get('/floodlist-weblink', services.add_weblink)
route.get('/twitter', services.add_twit)
/**
 *  @description for update flood
 *  @method GET /update-flood
 */
route.get('/update-flood', services.update_flood)


// API
//flood
route.get('/api/flood', (req, res,next) => {

    if (req.query.id) {
        const id = req.query.id;

      model.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send(error)
                    console.log(error);
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Erro retrieving flood with id " + id })
            })

 

    } else {
       model.find()
            .then(flood => {
                res.send(flood)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Occurred while retriving flood information" })
            })
      
    }


});
// route.put('/api/flood/:id', controller.update);
route.delete('/api/flood/:id', (req, res ) => {
    const id = req.params.id;

   model.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
            } else {
                res.send({
                    message: "Flood was deleted successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Flood with id=" + id
            });
        });
       
     
});
//Link
 
route.get('/api/link',(req, res ) => {

    if (req.query.id) {
        const id = req.query.id;

        
       weblinkmodel.findById(id)
            .then(link => {
                if (!link) {
                    res.status(404).send(errorr)
                    console.log(errorr);
                } else {
                    res.send(link)
                }
            })
            .catch(errr => {
                res.status(500).send({ message: "Erro retrieving weblink with id " + id })
            })

    } else {
     weblinkmodel.find()
            .then(links=> {
                res.send(links)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Occurred while retriving link information" })
            })
     
    }


});
 
route.delete('/api/link/:id', (req, res ) => {
    const id = req.params.id;

 
    weblinkmodel.findByIdAndDelete(id)
        .then(link => {
            if (!link) {
                res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
            } else {
                res.send({
                    message: "Link was deleted successfully!"
                })
            }
        })
        .catch(errr => {
            res.status(500).send({
                message: "Could not delete Link with id=" + id
            });
        });
     
});
//tweet
route.get('/api/twit',(req, res ) => {

    if (req.query.id) {
        const id = req.query.id;

        
      twitmodel.findById(id)
            .then(twit => {
                if (!twit) {
                    res.status(404).send(errorr)
                    console.log(errorr);
                } else {
                    res.send(twit)
                }
            })
            .catch(errr => {
                res.status(500).send({ message: "Erro retrieving weblink with id " + id })
            })

    } else {
    twitmodel.find()
            .then(twits=> {
                res.send(twits)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Occurred while retriving link information" })
            })
     
    }


});
 
route.delete('/api/twit/:id', (req, res ) => {
    const id = req.params.id;

 
    twitmodel.findByIdAndDelete(id)
        .then(twit => {
            if (!twit) {
                res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
            } else {
                res.send({
                    message: "Twit was deleted successfully!"
                })
            }
        })
        .catch(errr => {
            res.status(500).send({
                message: "Could not delete Twit with id=" + id
            });
        });
     
});



module.exports = route