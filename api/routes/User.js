const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer();

router.post('/register', upload.none(), function(req,res){
    console.log(req.body.username);
    console.log(req.body.email);
    console.log(req.body.password);
});

router.post('/login', upload.none(), function(req,res){
    console.log(req.body.username);
    console.log(req.body.password);
});

module.exports = router;