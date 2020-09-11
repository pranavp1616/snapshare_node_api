const express = require('express');
const router = express.Router();

const PhotoPostModel = require('../models/PhotoPostModel');
const UserModel = require('../models/UserModel');
const getTokenFromHeader = require('../helperFunctions/getTokenFromHeader');
const IsAuthenticated = require('../helperFunctions/IsAuthenticatedMiddleware');

router.post('/:pk', IsAuthenticated, function(req,res){
    UserModel.findOne({auth_token:getTokenFromHeader(req)})
    .exec()
    .then( function(user){

    })
    .catch( function(){

    })
});

module.exports = router;