const express = require('express');
const router = express.Router();
const IsAuthenticated = require('../helperFunctions/IsAuthenticatedMiddleware');
const getAllPhotoposts = require('../helperFunctions/getAllPhotoposts');
const UserModel = require('../models/UserModel');

router.get('/:friendName/page/:pageNo', IsAuthenticated, function(req, res) {
    UserModel.findOne({username:req.params.friendName})
    .exec()
    .then((userObj)=>{
        if(userObj){
            getAllPhotoposts({uploaded_by:userObj.username}, req.params.pageNo)
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch((err) => {
                return res.status(500).json(err);
            });    
        }else{
            return res.status(200).json([]);
        }
    })
    .catch((err)=>{ return res.status(500).json(err)});

});

module.exports = router;