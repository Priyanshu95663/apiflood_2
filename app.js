var express = require('express');
var mongoose = require('mongoose');
var multer = require('multer');
var path = require('path');
var fs = require('fs');
var Flooddb = require('./server/model/model');
const weblinkmodel = require('./server/model/weblinkmodel');
const twitmodel = require('./server/model/twitmodel');
const cookieParser = require("cookie-parser")
//MONGO_URL=mongodb+srv://manav:manav123@cluster0.aaovc.mongodb.net/Floodsatsearch?retryWrites=true&w=majority

const jwt=require("jsonwebtoken");
var csv = require('csvtojson');
var bodyParser = require('body-parser');
const { response } = require('express');
const Registerdb = require('./server/model/register');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
//init app
var app = express();
var uploads = multer({ storage: storage });
require('dotenv').config();
//connect to db
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, { useUnifiedTopology: true })
    .then(() => console.log('connected to db'))
    .catch((err) => console.log(err))

console.log(process.env.SECRET_KEY);

//set the template engine
app.set('view engine', 'ejs');
app.use('/', require('./server/routes/router'))

//fetch data from the request
app.use(bodyParser.json({ limit: '50mb', extended: true }))
app.use(cookieParser());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept');
    next();
});

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
//static folder
app.use(express.static(path.resolve(__dirname, 'public')));
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))



//default pageload



var temp;
app.get('/login',async (req, res, next) => {

    try {
        
        res.render("login")

    }
    catch (e) {
        res.status(500).send(e)
    }
})
app.get('/flooddata', async (req, res, next) => {

    try {
        const cases = await Flooddb.find({})
        res.send(cases)

    }
    catch (e) {
        res.status(500).send(e)
    }
});

app.get('/weblinks', async (req, res, next) => {

    try {
        const links = await weblinkmodel.find({})
        res.send(links)

    }
    catch (e) {
        res.status(500).send(e)
    }
});
app.get('/twits', async (req, res, next) => {

    try {
        const twits = await twitmodel.find({})
        res.send(twits)

    }
    catch (e) {
        res.status(500).send(e)
    }
});


//login check

app.post('/register',async(req,res)=>{
    try {
        
        const password = req.body.password;
        const cpassword= req.body.confirmpassword;
        console.log(password, cpassword)
        const data = {
            username : req.body.username,
            email : req.body.email,
            password : req.body.password
          
        }
        if(password === cpassword){
            console.log("im here ")
            

            const registeruser =new  Registerdb({
                username : req.body.username,
                email : req.body.email,
                password : req.body.password
            })

            const token = await registeruser.generateAuthToken();
            res.cookie("jwt",token, {
                expires:new Date(Date.now() +(24*60*60*1000*2)),
                httpOnly:true
            });
            const registered = await registeruser.save();
            res.status(201).render("login");

        }else{
            res.send("password are not matching");
        }
        
    }
    catch (error) {
        res.status(400).send(error);

    }
})



app.post('/login', async (req, res, next) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }
    try {
        const email = req.body.email;
        const password = req.body.password;
        console.log(email);
        console.log(password);
        const useremail = await Registerdb.findOne({ email: email })
        const token = await useremail.generateAuthToken();

        res.cookie("jwt",token, {
            expires:new Date(Date.now() +(24*60*60*1000*2)),
            httpOnly:true,
            // secure:true
        });
        console.log("cookie",res.cookie )
        if (useremail.password === password) {

            // res.send(response);
            res.redirect('/allfloods');



        }
        else {
            res.status(400).send("invalid credentials");

        }
    }
    catch (error) {
        res.status(400).send("invalid credentials");

    }

});


app.get('/logout', async(req,res)=>{
    try{
        res.clearCookie("jwt");
        console.log("logout successfully");
        await req.user.save();
        res.render("login");
    } catch{
        res.status(500).send(error);
    }
    
})

app.post('/api/flood', uploads.single('csv'), (req, res, next) => {

    if (!req.body) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }

    //convert csvfile to jsonArray   
    csv()
        .fromFile(req.file.path)
        .then((jsonObj) => {
            console.log(jsonObj);
            const flood = new Flooddb({
                floodname: req.body.floodname,
                StartDate: req.body.StartDate,
                EndDate: req.body.EndDate,
                CountryName: req.body.CountryName,
                SatelliteName: req.body.SatelliteName,
                Latitude: req.body.Latitude,
                Longitude: req.body.Longitude,
                flooddata: jsonObj

            })

            flood.save(flood).then(data => {
                // res.send(data)

                ("./" + fs.unlinkSync(req.file.path));
                res.redirect('/allfloods');
            })
                .catch((error) => {
                    res.status(500).send({
                        message: error.message || "Some error occurred while creating a create operation"
                    });
                });

        });

});
app.post('/api/link', uploads.single('csv2'), (req, res, next) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }

    //convert csvfile to jsonArray   
    csv()
        .fromFile(req.file.path)
        .then((jsonObj) => {
            console.log(jsonObj);
            const link = new weblinkmodel({

                CountryName: req.body.CountryName,

                weblinkdata: jsonObj

            })

            link.save(link).then(data => {
                // res.send(data)

                ("./" + fs.unlinkSync(req.file.path));
                res.redirect('/allfloods');
            })
                .catch((error) => {
                    res.status(500).send({
                        message: error.message || "Some error occurred while creating a create operation"
                    });
                });

        });

});

app.post('/api/twit', uploads.single('csv3'), (req, res, next) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }

    //convert csvfile to jsonArray   
    csv()
        .fromFile(req.file.path)
        .then((jsonObj) => {
            console.log(jsonObj);
            const twit = new twitmodel({

                CountryName: req.body.CountryName,

                twitdata: jsonObj

            })

            twit.save(twit).then(data => {
                // res.send(data)

                ("./" + fs.unlinkSync(req.file.path));
                res.redirect('/allfloods');
            })
                .catch((error) => {
                    res.status(500).send({
                        message: error.message || "Some error occurred while creating a create operation"
                    });
                });

        });

});

app.put('/api/flood/:id', async (req, res, next) => {
    if (!req.body) {
        return res.status(400).send({ message: "Data to update can not be empty" })
    }

    const id = req.params.id;
    await Flooddb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Update flood with ${id}. Maybe flood not found!` })
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Update flood information" })
        })

})

app.put('/api/link/:id', async (req, res, next) => {
    if (!req.body) {
        return res.status(400).send({ message: "Data to update can not be empty" })
    }

    const id = req.params.id;
    await weblinkmodel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Update link with ${id}. Maybe flood not found!` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Update link information" })
        })
    if (!req.body) {
        return res.status(400).send({ message: "Data to update can not be empty" })
    }
});

app.put('/api/twit/:id', async (req, res, next) => {
    if (!req.body) {
        return res.status(400).send({ message: "Data to update can not be empty" })
    }

    const id = req.params.id;
    await twitmodel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Update twit with ${id}. Maybe flood not found!` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Update twit information" })
        })
    if (!req.body) {
        return res.status(400).send({ message: "Data to update can not be empty" })
    }
});
//assign port
var port = process.env.PORT || 3000;
app.listen(port, () => console.log('server run at port ' + port));