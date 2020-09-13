const express = require('express');
const router = express.Router();
const IsAuthenticated = require('../helperFunctions/IsAuthenticatedMiddleware');
const UserModel = require('../models/UserModel');

router.get('/:pattern/page/:pageNo', IsAuthenticated, function(req, res) {
    const pattern = req.params.pattern;
    UserModel.find({ 'username': new RegExp(pattern,'i') })
    .exec()
    .then((result)=> {
        var search_result = [];
        const len = result.length;
        for(var i=0; i<len; i++)
            search_result.push(result[i].username);
        return res.status(200).json(search_result); 
    })
    .catch((err)=> { return res.status(500).json(err); })
});

module.exports = router;