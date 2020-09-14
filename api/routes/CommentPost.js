const express = require('express');
const router = express.Router();

const PhotoPostModel = require('../models/PhotoPostModel');
const IsAuthenticated = require('../helperFunctions/IsAuthenticatedMiddleware');
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer();

//(POST) comment
router.post('/:pk', IsAuthenticated, upload.none(), function(req, res) {
    PhotoPostModel.findById(req.params.pk)
        .exec()
        .then(function(photoObj) {
            const tempCommentObj = {
                username: req.user.username,
                comment: req.body.comment,
                date_created: Date.now()
            };
            photoObj.comments.set(new mongoose.Types.ObjectId().toString(), tempCommentObj);
            photoObj.save().then(() => {
                return res.status(200).json({
                    'response': 'success',
                    'message': 'comment posted'
                });
            });
        })
        .catch(() => {
            return res.status(500).json({
                'response': 'error',
                'message': 'server error'
            });
        })
});

// (DELETE) comment
router.delete('/:pk/:commentId', IsAuthenticated, function(req, res) {
    PhotoPostModel.findById(req.params.pk)
        .exec()
        .then(function(photoObj) {
            if (req.user._id.equals(photoObj.uploaded_by)) {
                photoObj.comments.delete(req.params.commentId);
                photoObj.save().then(() => {
                    return res.status(200).json({
                        'response': 'success',
                        'message': 'comment deleted'
                    });
                });
            } else
                return res.status(500).json({
                    'response': 'error',
                    'message': 'cannot delete other users comment'
                });
        })
        .catch(() => {
            return res.status(500).json({
                'response': 'error',
                'message': 'server error'
            });
        })
});

// GET all comments of :pk photo 
router.get('/:pk', IsAuthenticated, function(req, res) {
    PhotoPostModel.findById(req.params.pk)
        .exec()
        .then(function(photoObj) {
            const commentsArray = Array.from(photoObj.comments, ([key,value])=>({key,value}));
            return res.status(200).json(commentsArray);
        })
        .catch(function() {
            return res.status(500).json({
                'response': 'error',
                'message': 'server error'
            });
        })
});

module.exports = router;