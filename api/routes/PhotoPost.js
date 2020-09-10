const express = require('express');
const router = express.Router();

const multer = require('multer'); // for parsing formdata (with images/files)
const upload = multer({dest : '/uploads/'});
 
router.post('/create', upload.single('image') ,function(req,res){
    console.log(req.file);
    console.log(req.body.hashtags);
});

router.delete('/delete/:pk', function(req,res){
    console.log('delete id '+req.params.pk);
});

module.exports = router;