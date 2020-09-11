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
                // check already liked
                const alreadyLiked = photoObj.likes.get(req.user.username);
                console.log("TEST"+alreadyLiked);
                if(alreadyLiked){   // dislike
                    delete photoObj.likes.get(req.user.username);
                }else{  // like
                    const tempLikeObj = { date_created:Date.now() };
                    photoObj.likes.set(req.user.username,tempLikeObj);
                    photoObj.save().then(function(){ 
                        console.log('liked');
                        console.log(photoObj);
                    });    
                }
    })
    
});

// GET all likes of :pk photo 
router.get('/:pk', IsAuthenticated, function(req,res){
});

module.exports = router;