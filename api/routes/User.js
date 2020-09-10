const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const multer = require('multer');
const upload = multer();
const bcrypt = require('bcrypt');

const UserModel = require('../models/UserModel');

router.post('/register', upload.none(), function(req,res){
//    console.log(req.body.username + req.body.email  + req.body.password);
//  var hash_pwd = bcrypt.hash(req.body.password,10);              // HASH password and store (add this later)
    const userObj = new UserModel({
        _id : new mongoose.Types.ObjectId(),
        username : req.body.username,
        email : req.body.email,
        password : req.body.password,
        date_created : Date.now()
    });
    userObj.save()
    .then(  function(){ res.status(201).json({response:'success'})}    )
    .catch( function(){ res.status(500).json({response:'error'})});
});

router.post('/login', upload.none(), function(req,res){
//    console.log(req.body.username + req.body.password);
    UserModel.findOne({ username: req.body.username }).exec()
    .then( function(db_res) {
        if(req.body.password == db_res.password) res.status(200).json({ response:'loggedin'});
        else res.status(200).json({response:'incorrect password'});
    })
    .catch( function(err) { 
        res.status(200).json({response:'username doesnt exist'})
    });

});

module.exports = router;