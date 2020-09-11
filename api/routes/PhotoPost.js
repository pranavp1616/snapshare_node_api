const express = require('express');
const router = express.Router();

const multer = require('multer'); // for parsing formdata (with images/files)
const myStorageConfig = multer.diskStorage({
    destination: function(req, file, callbackfn) {
        callbackfn(null, './media');   
    },
    filename: function(req, file, callbackfn) {
        callbackfn(null, file.originalname);
    }
})
const upload = multer({
    storage: myStorageConfig
});

const mongoose = require('mongoose');
const PhotoPostModel = require('../models/PhotoPostModel');
const IsAuthenticated = require('../helperFunctions/IsAuthenticatedMiddleware');

router.post('/create', IsAuthenticated, upload.single('image'), function(req, res) {
    const photoObj = new PhotoPostModel({
        _id: new mongoose.Types.ObjectId(),
        uploaded_by: req.user._id,
        image: req.file.path,
        hashtags: req.body.hashtags,
        date_created: Date.now(),
        likes: {},
        comments: {}
    });
    photoObj
        .save()
        .then(function() {
            return res.status(201).json({
                response: 'success'
            })
        })
        .catch(function() {
            return res.status(500).json({
                response: 'error'
            })
        });
});

router.delete('/delete/:pk', IsAuthenticated, function(req, res) {
    PhotoPostModel
        .findById(req.params.pk)
        .exec()
        .then(function(photoObj) {
            if (req.user._id.equals(photoObj.uploaded_by)) {
                PhotoPostModel
                    .deleteOne({
                        _id: req.params.pk
                    })
                    .exec()
                    .then(function() {
                        return res.status(200).json({
                            response: 'success'
                        })
                    })
                    .catch(function() {
                        return res.status(500).json({
                            response: 'server error'
                        })
                    });
            } else
                return res.status(200).json({
                    response: 'cannot delete other user post'
                });
        })
        .catch(function() {
            return res.status(500).json({
                response: 'photo id wrong error'
            });
        })
});

module.exports = router;