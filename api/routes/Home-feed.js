const express = require('express');
const router = express.Router();
const IsAuthenticated = require('../helperFunctions/IsAuthenticatedMiddleware');
const PhotoPostModel = require('../models/PhotoPostModel');

const POST_PER_PAGE = 2;

router.get('/page/:pageNo', IsAuthenticated, function(req, res) {
    const pageNo = req.params.pageNo;

    PhotoPostModel
    .find()
    .sort({ date_created: -1 })
    .limit(POST_PER_PAGE)
    .select('_id uploaded_by image hashtags date_created')
    .exec()
    .then(function(data){
        return res.status(200).json(data);
    })
    .catch(function(){ return res.status(500).json({'response':'error'}); });
    
});

module.exports = router;