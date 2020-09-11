const express = require('express');
const router = express.Router();

const multer = require('multer'); // for parsing formdata (with images/files)
const upload = multer({dest : '/uploads/'});

const mongoose = require('mongoose');
const PhotoPostModel = require('../models/PhotoPostModel');
const UserModel = require('../models/UserModel');

const checktoken_middleware = require('./checktoken_middleware');

router.post('/create', checktoken_middleware, upload.single('image') ,function(req,res){
//    console.log(req.file);
    const req_token = req.headers.authorization.split(' ')[1];
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

router.delete('/delete/:pk', function(req,res){
    console.log('delete id '+req.params.pk);
    // Delete only if the given photo id belongs to logged in user (ie from req token)
    PhotoPostModel.deleteOne({ _id : req.params.pk } ).exec()
    .then(  function(){ res.status(200).json({response:'success'})}    )
    .catch( function(){ res.status(500).json({response:'error'})});
});

module.exports = router;