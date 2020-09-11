const express = require('express');
const router = express.Router();
const upload = multer({dest : '/uploads/'});

const mongoose = require('mongoose');
const IsAuthenticated = require('../helperFunctions/IsAuthenticatedMiddleware');
const CommentModel = require('../models/CommentModel');

router.post('/:pk', IsAuthenticated, upload.none(), function(req,res){
    const commentObj = new CommentModel({
                _id : new mongoose.Types.ObjectId(),
                by : req.user._id,
                image : req.params.pk,
                comment : req.body.comment,
                date_created : Date.now()
            });
            
    commentObj
    .save()
    .then(  function(){ return res.status(200).json({response:'commented'})})
    .catch( function(){ return res.status(500).json({response:'error'})});                    
});

// GET all comments of :pk photo 
router.get('/:pk', IsAuthenticated, function(req,res){
    CommentModel.find({image:req.params.pk})
    .exec()
    .then( function(commentArray){
        return res.status(200).json(commentArray);
    })
    .catch( function(){ return res.status(500).json({response:'server error'})});
});

// delete comment with _id  :pk 
router.delete('/:pk', IsAuthenticated, function(req,res){
    CommentModel.findById(req.params.pk)
    .exec()
    .then( function(cmntObj){
            if(req.user._id.equals(cmntObj.by)){
                CommentModel.deleteOne({ _id : req.params.pk } )
                .exec()
                .then(  function(){ return res.status(200).json({response:'success'})} )
                .catch( function(){ return res.status(500).json({response:'server error'})} );       
            }
            else{
                return res.status(500).json({response:'error you cant delete other users comment'});
            }
    })
    .catch(function() { return res.status(500).json({response:'comment error'});    })
});

module.exports = router;