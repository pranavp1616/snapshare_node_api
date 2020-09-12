const express = require('express');
const router = express.Router();

const PhotoPostModel = require('../models/PhotoPostModel');
const IsAuthenticated = require('../helperFunctions/IsAuthenticatedMiddleware');
const mongoose = require('mongoose');

//(POST) comment
router.post('/:pk', IsAuthenticated, function(req, res) {
    PhotoPostModel.findById(req.params.pk)
        .exec()
        .then(function(photoObj) {
            const tempCommentObj = {
                username: req.user.username,
                comment: 'test_comment',
                date_created: Date.now()
            };
            photoObj.comments.set(new mongoose.Types.ObjectId().toString(), tempCommentObj);
            photoObj.save().then(()=>{
                return res.status(200).json({'response':'success','message':'comment posted'});
            });
        })
        .catch(()=>{
            return res.status(500).json({'response':'error','message':'server error'});
        })
});

// (DELETE) comment
router.delete('/:pk/:commentId', IsAuthenticated, function(req, res) {
    // goto comment and then delete it (if the token user and photo uploaded by are both same)
    PhotoPostModel.findById(req.params.pk)
        .exec()
        .then(function(photoObj) {
            photoObj.comments.delete(req.params.commentId);
            photoObj.save().then(function() {
                return res.status(200).json({'response':'success','message':'comment deleted'});
            });
        })
        .catch(()=>{
            return res.status(500).json({'response':'error','message':'server error'});
        })
});

// GET all comments of :pk photo 
router.get('/:pk', IsAuthenticated, function(req, res) {
    PhotoPostModel.findById(req.params.pk)
        .exec()
        .then(function(photoObj) {
            return res.status(200).json(photoObj.comments);
        })
        .catch(function() {
            return res.status(500).json({'response':'error','message':'server error'});
        })
});

module.exports = router;