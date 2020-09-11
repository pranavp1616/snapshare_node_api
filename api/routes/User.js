const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const multer = require('multer');
const upload = multer();
//const bcrypt = require('bcrypt');   - HASH password (Add later)

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
            else
                return _createAndSaveNewUser(req, res);
        });
});

router.post('/login', upload.none(), function(req, res) {
    UserModel.findOne({
            username: req.body.username
        })
        .exec()
        .then(function(db_user) {
            if (db_user) {
                if (req.body.password == db_user.password)
                    return res.status(200).json({
                        response: 'success',
                        auth_token: db_user.auth_token
                    });
                else
                    return res.status(200).json({
                        response: 'incorrect password'
                    });
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

function _createAndSaveNewUser(req, res) {
    const userObj = new UserModel({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
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