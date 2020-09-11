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
            // already liked
            LikeModel.deleteOne({by:req.user._id,image:req.params.pk}).exec();
            console.log('disliked');
        }
        else{
            const likeObj = new LikeModel({
                _id : new mongoose.Types.ObjectId(),
                by : req.user._id,
                image : req.params.pk,
                date_created : Date.now()
            });
            likeObj.save();
            console.log('liked');                
        }
    })
    .catch( function(){
        
    })
    
});

module.exports = router;