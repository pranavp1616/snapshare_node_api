const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const IsAuthenticated = require('../helperFunctions/IsAuthenticatedMiddleware');

// like/dislike (POST)
router.post('/:pk', IsAuthenticated, function(req,res){
    console.log('like/dislike');
});

// GET all likes of :pk photo 
router.get('/:pk', IsAuthenticated, function(req,res){
    console.log('get all like');
});

module.exports = router;