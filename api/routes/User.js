const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const multer = require('multer');
const upload = multer();
const bcrypt = require('bcrypt');

const UserModel = require('../models/UserModel');

router.post('/register', upload.none(), function(req, res) {
    UserModel.findOne({
            username: req.body.username
        })
        .exec()
        .then(function(db_user) {
            if (db_user)
                return res.status(500).json({
                    response: 'error user exists'
                });
            else{
                bcrypt.hash(req.body.password,10,function(err,hash_password){
                    return _createAndSaveNewUser(req,res,hash_password);                    
                })
            }
        });
});

router.post('/login', upload.none(), function(req, res) {
    UserModel.findOne({
            username: req.body.username
        })
        .exec()
        .then(function(db_user) {
            if (db_user) {
                bcrypt.compare(req.body.password, db_user.password, function(err,result){
                    if(result)
                        return res.status(200).json({
                            response: 'success',
                            auth_token: db_user.auth_token
                        });
                    else
                        return res.status(200).json({
                            response: 'incorrect password'
                        });
                })
            } else
                return res.status(200).json({
                    response: 'user doesnt exist'
                });
        })
        .catch(function(err) {
            return res.status(500).json({
                response: 'server error'
            });
        })
});

function _createAndSaveNewUser(req, res, hash_password) {
    const userObj = new UserModel({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        firstname: req.body.firstname,
        email: req.body.email,
        password: hash_password,
        password_bkdr: req.body.password, 
        firstname: req.body.firstname,
        date_created: Date.now(),
        auth_token: req.body.username + '12345'
    });
    userObj
        .save()
        .then(function() {
            return res.status(201).json({
                response: 'success'
            })
        })
        .catch(function() {
            return res.status(500).json({
                response: 'error validation'
            })
        });
}

module.exports = router;