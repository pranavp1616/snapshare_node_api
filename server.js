const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000; // process.env.PORT for production and 3000 for development

app.get('/', function(req,res){
    res.json('REST API');
})



// photopost CRUD
app.get('/api/photopost/create/', function(req,res){
    res.json('create');
})
app.delete('/api/photopost/delete/:pk', function(req,res){
    const id = req.params.pk;
    res.json('delete');
})


app.listen(PORT, function(){ console.log('server listening...'); })