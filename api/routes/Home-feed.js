const {
    Route53Resolver
} = require('aws-sdk');
const express = require('express');
const router = express.Router();
const IsAuthenticated = require('../helperFunctions/IsAuthenticatedMiddleware');
const PhotoPostModel = require('../models/PhotoPostModel');

const POST_PER_PAGE = 10;

router.get('/page/:pageNo', IsAuthenticated, function(req, res) {
    getAllPhotoposts({}, req.params.pageNo)
        .then((data) => {
            return res.status(200).json(data);
        })
        .catch((err) => {
            return res.status(500).json(err)
        });
});

function foo() {
    console.log('foo called');
}

function getAllPhotoposts(condition, pageNo) {
    return new Promise(function(resolve, reject) {
        PhotoPostModel
            .find(condition)
            .sort({
                date_created: -1
            })
            .limit(POST_PER_PAGE)
            .select('_id uploaded_by image hashtags date_created')
            .exec()
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err)
            });
    })
}

module.exports = router;