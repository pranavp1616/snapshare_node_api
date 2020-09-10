// Use import later (ES6)
const express = require('express');
const bodyParser= require('body-parser');
const { Client } = require('pg');


const app = express();
const PORT = process.env.PORT || 3000; // process.env.PORT for production and 3000 for development

// POSTGRES DB connection
const pg_client = new Client ({
    user : 'postgres',
    host : 'localhost',
    database : 'snapshare_db',
    password : 'postgres',
    port : 5432
})
pg_client.connect();
pg_client.query('select * from test;', (err,res)=> {
    console.log(res.rows);
    pg_client.end();  
})

// *********************************************
//              REST API start
// *********************************************
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

// *********************************************
// *********************************************

// start server
app.listen(PORT, function(){ console.log('server listening...'); })