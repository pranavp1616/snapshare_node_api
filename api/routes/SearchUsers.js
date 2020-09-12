const express = require('express');
const router = express.Router();
const IsAuthenticated = require('../helperFunctions/IsAuthenticatedMiddleware');
const UserModel = require('../models/UserModel');

router.get('/:pattern/page/:pageNo', IsAuthenticated, function(req, res) {
    console.log(req.params.pattern);
    const pattern = req.params.pattern;
    UserModel.find({ 'username': new RegExp(pattern,'i') })
    .exec()
    .then((result)=> { 
        return res.status(200).json(result); 
    })
    .catch((err)=> { return res.status(500).json(err); })
});

module.exports = router;