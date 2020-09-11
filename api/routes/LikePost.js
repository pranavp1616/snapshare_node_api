const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const PhotoPostModel = require('../models/PhotoPostModel');
const IsAuthenticated = require('../helperFunctions/IsAuthenticatedMiddleware');

// like/dislike (POST)
router.post('/:pk', IsAuthenticated, function(req,res){
    console.log('like/dislike');
    PhotoPostModel.findById(req.params.pk)
    .exec()
    .then(function(photoObj){ 
        // if username already exists in photoObj.likes[] array , then delete entry from  photoObj.likes[] array
        
        //else
        const likeObj = { _id : new mongoose.Types.ObjectId(),
                        username : req.user.username,
                        date_created : Date.now()   };
        photoObj.likes.push(likeObj);
        photoObj.
        save()
        .then(  function(){ return res.status(201).json({response:'liked'})})
        .catch( function(){ return res.status(500).json({response:'error'})});      
    })
    .catch(function(){ });
});

// GET all likes of :pk photo 
router.get('/:pk', IsAuthenticated, function(req,res){
    PhotoPostModel.findById(req.params.pk)
    .exec()
    .then(function(photoObj){
        return res.status(200).json(photoObj.likes);
    })
    .catch(function(){ } );
});

module.exports = router;