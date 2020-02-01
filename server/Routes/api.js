const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../Models/user');

const mongoose = require('mongoose');
const db = "mongodb://localhost:27017/eventsdb";

mongoose.connect(db,{ useNewUrlParser: true , useUnifiedTopology: true },(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("connected to mongodb");
    }
})

function verifyToken(req,res,next){
    if(!req.headers.autorization){
        res.status(401).send("Unauthorized request");
    }
    let token = req.headers.autorization.split(' ')[1];
    if(token === null){
        res.status(401).send("Unauthorized request");
    }
    let payload = jwt.verify(token, 'secretKey');
    if(!payload){
        res.status(401).send("Unauthorized request");
    }
    req.userId =payload.subject;
    next();
}

router.get('/',(req,res)=>{
    res.send("From the API router");
})

router.post('/register',(req,res)=>{
    let userData = req.body;
    let user = new User(userData);
    user.save((error,registereduser)=>{
        if(error){
            console.log(error);
        }else{
            let payload = { subject: registereduser._id};
            let token = jwt.sign(payload, "secretKey");
            res.status(200).send({token});
        }
    });
})

router.post('/login',(req,res)=>{
    let userData = req.body;
    User.findOne({email:userData.email},(error,foundUser)=>{
        if(error){
            console.log(error);
        }else{
            if(!foundUser){
                res.status(401).send('Invalid email');
            }else if(foundUser.password !== userData.password){
                res.status(401).send('Invalid password');
            }else{
                let payload = { subject: foundUser._id};
                let token = jwt.sign(payload, 'secretKey')
                res.status(200).send({token})
            }
        }
    })
})

router.get('/events',(req,res)=>{
    let events =[
        {
            "_id":"1",
            "name":"Auto Expo",
            "description":"Lorem Epsum",
            "date":"Sat Feb 01 2020 15:40:03 GMT+0530 (India Standard Time)"
        },
        {
            "_id":"2",
            "name":"Auto Expo",
            "description":"Lorem Epsum",
            "date":"Sat Feb 01 2020 15:40:03 GMT+0530 (India Standard Time)"
        },
        {
            "_id":"3",
            "name":"Auto Expo",
            "description":"Lorem Epsum",
            "date":"Sat Feb 01 2020 15:40:03 GMT+0530 (India Standard Time)"
        },
        {
            "_id":"4",
            "name":"Auto Expo",
            "description":"Lorem Epsum",
            "date":"Sat Feb 01 2020 15:40:03 GMT+0530 (India Standard Time)"
        },
        {
            "_id":"5",
            "name":"Auto Expo",
            "description":"Lorem Epsum",
            "date":"Sat Feb 01 2020 15:40:03 GMT+0530 (India Standard Time)"
        }

]
    res.json(events);
})

router.get('/special',verifyToken,(req,res)=>{
    let events =[
        {
            "_id":"1",
            "name":"Auto Expo",
            "description":"Lorem Epsum",
            "date":"Sat Feb 01 2020 15:40:03 GMT+0530 (India Standard Time)"
        },
        {
            "_id":"2",
            "name":"Auto Expo",
            "description":"Lorem Epsum",
            "date":"Sat Feb 01 2020 15:40:03 GMT+0530 (India Standard Time)"
        },
        {
            "_id":"3",
            "name":"Auto Expo",
            "description":"Lorem Epsum",
            "date":"Sat Feb 01 2020 15:40:03 GMT+0530 (India Standard Time)"
        },
        {
            "_id":"4",
            "name":"Auto Expo",
            "description":"Lorem Epsum",
            "date":"Sat Feb 01 2020 15:40:03 GMT+0530 (India Standard Time)"
        },
        {
            "_id":"5",
            "name":"Auto Expo",
            "description":"Lorem Epsum",
            "date":"Sat Feb 01 2020 15:40:03 GMT+0530 (India Standard Time)"
        }

]
    res.json(events);
})

module.exports = router;