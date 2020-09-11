const express = require('express');
const app = express();
const mongoose = require('mongoose');

const photoRoutes = require('./api/routes/PhotoPost');
const likeRoutes = require('./api/routes/LikePost');
const commentRoutes = require('./api/routes/CommentPost');
const userRoutes = require('./api/routes/User');

const PW = process.env.MONGO_ATLAS_PW || 'iostream';
mongoose.connect('mongodb+srv://pranav:' + PW + '@cluster0.hr6hw.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => console.log('********Connection Successful********')).catch(err => console.log(err));


// all API routes
const API_STRING = '/api';
app.use(API_STRING + '/like', likeRoutes);
app.use(API_STRING + '/photopost', photoRoutes);
app.use(API_STRING + '/user', userRoutes);
app.use(API_STRING + '/comment', commentRoutes);

// This will make media/images public
app.use('/media', express.static('media'));

module.exports = app;