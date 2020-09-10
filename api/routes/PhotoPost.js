const express = require('express');
const router = express.Router();

const multer = require('multer'); // for parsing formdata (with images/files)
const upload = multer({dest : '/uploads/'});

const mongoose = require('mongoose');
const PhotoPostModel = require('../models/PhotoPostModel');

router.post('/create', upload.single('image') ,function(req,res){
    console.log(req.file);
    const photoObj = new PhotoPostModel({
        _id : new mongoose.Types.ObjectId(),
        hashtags : req.body.hashtags
    });
    photoObj.save()
    .then(  function(){ res.status(201).json({response:'success'})}    )
    .catch( function(){ res.status(500).json({response:'error'})});
});

router.delete('/delete/:pk', function(req,res){
    console.log('delete id '+req.params.pk);
    PhotoPostModel.deleteOne({ _id : req.params.pk } ).exec();
});

module.exports = router;