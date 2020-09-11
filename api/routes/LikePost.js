const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const IsAuthenticated = require('../helperFunctions/IsAuthenticatedMiddleware');
const LikeModel = require('../models/LikeModel');

router.post('/:pk', IsAuthenticated, function(req,res){
    LikeModel.findOne({by:req.user._id,image:req.params.pk})
    .exec()
    .then(  function(likeObj){
        if(likeObj){
            LikeModel.deleteOne({by:req.user._id,image:req.params.pk})
            .exec()
            .then(  function(){ return res.status(200).json({response:'disliked'})} )
            .catch( function(){ return res.status(500).json({response:'server error'})} );  
        }
        else{
            const likeObj = new LikeModel({
                _id : new mongoose.Types.ObjectId(),
                by : req.user._id,
                image : req.params.pk,
                date_created : Date.now()
            });
            
            likeObj
            .save()
            .then(  function(){ return res.status(200).json({response:'liked'})})
            .catch( function(){ return res.status(500).json({response:'error'})});                    
        }
    })
    .catch( function(){
        return res.status(500).json({response:'error'});
    })    
});

module.exports = router;