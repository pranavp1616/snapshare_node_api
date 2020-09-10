const express = require('express');
const app = express();
const bodyParser= require('body-parser');

// process.env.PORT for production and 3000 for development
const PORT = process.env.PORT || 3000;

app.get('/', function(req,res){
    res.json('API')
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