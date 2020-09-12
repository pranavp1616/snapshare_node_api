const express = require('express');
const router = express.Router();
const IsAuthenticated = require('../helperFunctions/IsAuthenticatedMiddleware');
const getAllPhotoposts = require('../helperFunctions/getAllPhotoposts');

router.get('/page/:pageNo', IsAuthenticated, function(req, res) {
    getAllPhotoposts({uploaded_by:req.user._id}, req.params.pageNo)
        .then((data) => {
            return res.status(200).json(data);
        })
        .catch((err) => {
            return res.status(500).json(err)
        });
});

module.exports = router;