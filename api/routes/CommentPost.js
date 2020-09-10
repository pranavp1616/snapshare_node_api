const express = require('express');
const router = express.Router();

router.get('/',function(req,res){
    console.log('comment working');
})

module.exports = router;