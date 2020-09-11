const express = require('express');
const router = express.Router();
const IsAuthenticated = require('../helperFunctions/IsAuthenticatedMiddleware');

router.get('/page/:pageNo', IsAuthenticated, function(req, res) {
    const pageNo = req.params.pageNo;


    return res.status(200).json({'response':pageNo});
});

module.exports = router;