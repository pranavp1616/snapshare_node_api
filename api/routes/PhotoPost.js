const express = require('express');
const router = express.Router();

const multer = require('multer'); // for parsing formdata (with images/files)
const upload = multer({dest : '/uploads/'});

const mongoose = require('mongoose');
const PhotoPostModel = require('../models/PhotoPostModel');
const IsAuthenticated = require('../helperFunctions/IsAuthenticatedMiddleware');

router.post('/create', IsAuthenticated , upload.single('image') ,function(req,res){
//    console.log(req.file);
    console.log(req.user);
    const photoObj = new PhotoPostModel({
                    _id : new mongoose.Types.ObjectId(),
                    uploaded_by : req.user._id,
                    hashtags : req.body.hashtags,
                    date_created : Date.now()
    });
    
    photoObj
    .save()
    .then(  function(){ return res.status(201).json({response:'success'})})
    .catch( function(){ return res.status(500).json({response:'error'})});            
});

router.delete('/delete/:pk', IsAuthenticated, function(req,res){
    PhotoPostModel.findById(req.params.pk)
    .exec()
    .then( function(photoObj){
            if(req.user._id.equals(photoObj.uploaded_by)){
                PhotoPostModel.deleteOne({ _id : req.params.pk } )
                .exec()
                .then(  function(){ return res.status(200).json({response:'success'})} )
                .catch( function(){ return res.status(500).json({response:'server error'})} );       
            }
            else{
                return res.status(500).json({response:'error you cant delete other users post'});
            }
    })
    .catch(function() { return res.status(500).json({response:'photo error'});    })
 });

module.exports = router;