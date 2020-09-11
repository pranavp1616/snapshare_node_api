const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const PhotoPostModel = require('../models/PhotoPostModel');
const IsAuthenticated = require('../helperFunctions/IsAuthenticatedMiddleware');

//(POST) like/dislike
router.post('/:pk', IsAuthenticated, function(req,res){
    PhotoPostModel.findById(req.params.pk)
    .exec()
    .then(function(photoObj){
                photoObj.likes.set(req.user.username,'liked');
                photoObj.save().then(function(){ 
                    console.log('liked');
                    console.log(photoObj);
                });
    })
    
});

// GET all likes of :pk photo 
router.get('/:pk', IsAuthenticated, function(req,res){
});

module.exports = router;