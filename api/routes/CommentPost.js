const express = require('express');
const { route } = require('./PhotoPost');
const router = express.Router();

router.get('/',function(req,res){
    console.log('comment working');
})

module.exports = router;