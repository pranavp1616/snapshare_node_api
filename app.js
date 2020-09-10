const express = require('express');
const app = express();
const photoRoutes = require('./api/routes/PhotoPost');
const likeRoutes = require('./api/routes/LikePost');
const commentRoutes = require('./api/routes/CommentPost');
const userRoutes = require('./api/routes/User');

// all API routes
const API_STRING = '/api';
app.use(API_STRING+'/like', likeRoutes);
app.use(API_STRING+'/comment', commentRoutes);
app.use(API_STRING+'/photopost', photoRoutes);
app.use(API_STRING+'/user', userRoutes);

module.exports = app;