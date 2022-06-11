const axios = require('axios');
 
exports.homeRoutes = (req, res) => {
    // Make a get request to /api/floods
    
           // res.send(response);
            res.render('login' );
        
        

    
}

 

   // Make a get request to /api/floods
   
   
 
exports.add_flood = (req, res ) =>{
    res.render('add_flood');
}
exports.add_weblink = (req, res ) =>{
    res.render('floodlist-weblink');
}
exports.add_twit = (req, res ) =>{
    res.render('twitter');
}
exports.update_flood = (req, res) =>{
    axios.get('https://agile-hollows-34401.herokuapp.com/api/flood', { params : { id : req.query.id }})
        .then(function(response1){
            res.render("update_flood", { flood : response1.data})
        })
        .catch(err =>{
            res.send(err);
        })
}