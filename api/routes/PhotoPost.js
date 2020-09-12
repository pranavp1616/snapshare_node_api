const express = require('express');
const router = express.Router();

const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_SECRET
});

const mongoose = require('mongoose');
const PhotoPostModel = require('../models/PhotoPostModel');
const IsAuthenticated = require('../helperFunctions/IsAuthenticatedMiddleware');
const multer = require('multer'); // for parsing formdata (with images/files)

router.post('/create', IsAuthenticated, multer().single('image'), function(req, res) {
    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.file.originalname,
        Body: req.file.buffer
    };

    s3.upload(uploadParams, function(aws_err, aws_response_data) {
        if (!aws_err) {
            const photoObj = new PhotoPostModel({
                _id: new mongoose.Types.ObjectId(),
                uploaded_by: req.user._id,
                image: aws_response_data.Location,
                hashtags: req.body.hashtags,
                date_created: Date.now(),
                likes: {},
                comments: {}
            });

            photoObj
                .save()
                .then((db_data) => {
                    return res.status(201).json({
                        'response': 'success',
                        'data': db_data
                    })
                })
                .catch((err) => {
                    return res.status(500).json({
                        'response': 'error'
                    })
                });
        } else {
            return res.status(500).json('aws error');
        }
    })
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
                    .then(() => {
                        return res.status(200).json({
                            'response': 'success'
                        })
                    })
                    .catch((err) => {
                        return res.status(500).json({
                            'response': 'error',
                            'message': 'could not complete delete request,server error'
                        })
                    });
            } else
                return res.status(500).json({
                    'response': 'error',
                    'message': 'cannot delete another users post'
                });
        })
        .catch((err) => {
            return res.status(500).json({
                'response': 'error',
                'message': 'invalid photo id'
            });
        })
});

module.exports = router;