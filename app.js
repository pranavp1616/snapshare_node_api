const express = require('express');
const app = express();
const photoRoutes = require('./api/routes/photo');

const API_STRING = '/api';
app.use(API_STRING+'/photo', photoRoutes);

module.exports = app;