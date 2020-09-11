const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const PhotoPostModel = require('../models/PhotoPostModel');
const IsAuthenticated = require('../helperFunctions/IsAuthenticatedMiddleware');

//(POST) like/dislike
router.post('/:pk', IsAuthenticated, function(req,res){
});

// GET all likes of :pk photo 
router.get('/:pk', IsAuthenticated, function(req,res){
});

module.exports = router;