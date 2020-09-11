const express = require('express');
const router = express.Router();

const PhotoPostModel = require('../models/PhotoPostModel');
const IsAuthenticated = require('../helperFunctions/IsAuthenticatedMiddleware');

//(POST) like/dislike
router.post('/:pk', IsAuthenticated, function(req, res) {
    PhotoPostModel.findById(req.params.pk)
        .exec()
        .then(function(photoObj) {
            if (photoObj.likes.get(req.user.username)) {
                photoObj.likes.delete(req.user.username);
                msg = 'disliked';
            } else {
                const tempLikeObj = {
                    date_created: Date.now()
                };
                photoObj.likes.set(req.user.username, tempLikeObj);
                msg = 'liked';
            }
            photoObj.save().then(function() {
                return res.status(200).json({
                    response: msg
                });
            });
        })
        .catch(function() {
            return res.status(500).json({
                response: 'error sever'
            });
        })
});

// GET all likes of :pk photo 
router.get('/:pk', IsAuthenticated, function(req, res) {
    PhotoPostModel.findById(req.params.pk)
        .exec()
        .then(function(photoObj) {
            return res.status(200).json(photoObj.likes);
        })
        .catch(function() {
            return res.status(500).json({
                response: 'error sever'
            });
        })
});

module.exports = router;