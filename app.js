const express = require('express');
const app = express();
const photoRoutes = require('./api/routes/PhotoPost');
const likeRoutes = require('./api/routes/LikePost');
const commentRoutes = require('./api/routes/CommentPost');

const API_STRING = '/api';
app.use(API_STRING+'/photo', photoRoutes);
app.use(API_STRING+'/like', likeRoutes);
app.use(API_STRING+'/comment', commentRoutes);

module.exports = app;