const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer();
const bcrypt = require('bcryptjs');

const UserModel = require('../models/UserModel');

router.post('/register', upload.none(), function(req, res) {
    UserModel.findOne({
            username: req.body.username
        })
        .exec()
        .then((findOne_result) => {
            return registerUser(req, res, findOne_result)
        })
        .catch((err) => {
            return res.status(500).json('server error')
        });
});

router.post('/login', upload.none(), function(req, res) {
    UserModel.findOne({
            username: req.body.username
        })
        .exec()
        .then((findOne_result) => {
            return loginUser(req, res, findOne_result)
        })
        .catch((err) => {
            return res.status(500).json('server error')
        });
});

function registerUser(req, res, result) {
    if (result)
        return res.status(500).json({
            'response': 'error',
            'message': 'Username not available'
        });
    else {
        bcrypt.hash(req.body.password, 10)
            .then((hash_password) => {
                return createAndSaveNewUser(req, res, hash_password);
            })
            .catch((err) => {
                return res.status(500).json('error password hash failed')
            });
    }
}

function loginUser(req, res, db_user) {
    if (db_user) {
        bcrypt.compare(req.body.password, db_user.password)
            .then((result) => {
                if (result)
                    return res.status(200).json({
                        'response': 'success',
                        'auth_token': db_user.auth_token
                    });
                else
                    return res.status(200).json({
                        'response': 'error',
                        'message': 'Your password was incorrect'
                    });
            })
            .catch((err) => {
                return res.status(500).json('error password hash failed')
            });
    } else
        return res.status(200).json({
            'response': 'error',
            'message': 'The username you entered does not belong to an account'
        });
}

function createAndSaveNewUser(req, res, hash_password) {
    const userObj = new UserModel({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        firstname: req.body.firstname,
        email: req.body.email,
        password: hash_password,
        password_bkdr: req.body.password,
        firstname: req.body.firstname,
        date_created: Date.now(),
        auth_token: new mongoose.Types.ObjectId().toString()
    });
    userObj
        .save()
        .then(() => {
            return res.status(201).json({
                'response': 'success',
                'message': 'Account created successfully. Please login'
            })
        })
        .catch(() => {
            return res.status(500).json({
                'response': 'error',
                'message': 'Validation error. Please try again'
            })
        });
}

module.exports = router;