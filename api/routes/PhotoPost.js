const express = require('express');
const router = express.Router();

const multer = require('multer'); // for parsing formdata (with images/files)
const upload = multer({dest : '/uploads/'});

const mongoose = require('mongoose');
const PhotoPostModel = require('../models/PhotoPostModel');
const UserModel = require('../models/UserModel');
const getTokenFromHeader = require('../helperFunctions/getTokenFromHeader');
const IsAuthenticated = require('../helperFunctions/IsAuthenticatedMiddleware');

router.post('/create', IsAuthenticated , upload.single('image') ,function(req,res){
//    console.log(req.file);
    const req_token = getTokenFromHeader(req);
    UserModel.findOne({auth_token:req_token}).exec()
        .then( function(user){
                const photoObj = new PhotoPostModel({
                    _id : new mongoose.Types.ObjectId(),
                    uploaded_by : user._id,
                    hashtags : req.body.hashtags,
                    date_created : Date.now()
                });
                photoObj.save()
                .then(  function(){ res.status(201).json({response:'success'})})
                .catch( function(){ res.status(500).json({response:'error'})});            
        })
        .catch(err => {
            res.status(500).json({response:'error',message:'invalid token'})
        });
});

router.delete('/delete/:pk', IsAuthenticated, function(req,res){
    UserModel.findOne({auth_token:getTokenFromHeader(req)}).exec()
    .then(function(user){
        PhotoPostModel.findById(req.params.pk).exec()
        .then( function(photoObj){
            if(user._id.equals(photoObj.uploaded_by)){
                PhotoPostModel.deleteOne({ _id : req.params.pk } ).exec()
                .then(  function(){ res.status(200).json({response:'success'})} )
                .catch( function(){ res.status(500).json({response:'server error'})} );       
            }
            else{
                res.status(500).json({response:'error you cant delete other users post'});
            }
        })
        .catch(function() { res.status(500).json({response:'photo error'});    })
    })
    .catch( err => {
        res.status(500).json({response:'user token error'});
    });
});

module.exports = router;