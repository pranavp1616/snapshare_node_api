const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const multer = require('multer');
const upload = multer();

const UserModel = require('../models/UserModel');

router.post('/register', upload.none(), function(req,res){
//    console.log(req.body.username + req.body.email  + req.body.password);
    const userObj = new UserModel({
        _id : new mongoose.Types.ObjectId(),
        username : req.body.username,
        email : req.body.email,
        password : req.body.password
    });
    userObj.save()
    .then(  function(){ res.status(201).json({response:'success'})}    )
    .catch( function(){ res.status(500).json({response:'error'})});
});

router.post('/login', upload.none(), function(req,res){
    console.log(req.body.username);
    console.log(req.body.password);
});

module.exports = router;