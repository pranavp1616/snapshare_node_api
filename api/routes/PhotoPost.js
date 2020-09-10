const express = require('express');
const router = express.Router();

router.get('/', function(req,res){
    console.log('photo working');
});

router.post('/', function(req,res){
    console.log('post photo')
});

router.delete('/', function(req,res){
    console.log('delete photo');
});

module.exports = router;