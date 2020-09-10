const express = require('express');
const router = express.Router();

const multer = require('multer'); // for parsing formdata (with images/files)
const upload = multer({dest : '/uploads/'});

const mongoose = require('mongoose');
const PhotoPostModel = require('../models/PhotoPostModel');
const UserModel = require('../models/UserModel');

router.post('/create', upload.single('image') ,function(req,res){
    console.log(req.file);
    const req_user = UserModel.findById(req.body.uploaded_by)     // CHANGE THIS TO - find user using req token 
        .then(() => console.log('okay proceed'))
        .catch(err => {
            res.status(500).json({response:'error',message:'user doesnt exist'})
        });

    const photoObj = new PhotoPostModel({
        _id : new mongoose.Types.ObjectId(),
        uploaded_by : req.body.uploaded_by,
        hashtags : req.body.hashtags,
        date_created : Date.now()
    });
    photoObj.save()
    .then(  function(){ res.status(201).json({response:'success'})})
    .catch( function(){ res.status(500).json({response:'error'})});
});

router.delete('/delete/:pk', function(req,res){
    console.log('delete id '+req.params.pk);
    // Delete only if the given photo id belongs to logged in user (ie from req token)
    PhotoPostModel.deleteOne({ _id : req.params.pk } ).exec()
    .then(  function(){ res.status(200).json({response:'success'})}    )
    .catch( function(){ res.status(500).json({response:'error'})});
});

module.exports = router;