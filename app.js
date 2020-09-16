const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const photoRoutes = require('./api/routes/PhotoPost');
const likeRoutes = require('./api/routes/LikePost');
const commentRoutes = require('./api/routes/CommentPost');
const userRoutes = require('./api/routes/User');
const homeFeedRoutes = require('./api/routes/Home-feed');
const friendFeedRoutes = require('./api/routes/Friend-feed');
const searchUsersRoutes = require('./api/routes/SearchUsers');
const myprofileFeedRoutes = require('./api/routes/Myprofile-feed');

require('dotenv').config();
const DB = process.env.MONGO_ATLAS_DB; 
const PW = process.env.MONGO_ATLAS_PW;
mongoose.connect('mongodb+srv://pranav:' + PW + '@cluster0.hr6hw.mongodb.net/'+DB+'?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => console.log('********Connection Successful********')).catch(err => console.log(err));


// CORS enable
app.use(cors());

// all API routes
const API_STRING = '/api';
app.use(API_STRING + '/like', likeRoutes);
app.use(API_STRING + '/photopost', photoRoutes);
app.use(API_STRING + '/user', userRoutes);
app.use(API_STRING + '/comment', commentRoutes);
app.use(API_STRING + '/friend', friendFeedRoutes);
app.use(API_STRING + '/myprofile', myprofileFeedRoutes);
app.use(API_STRING + '/search', searchUsersRoutes);
app.use(API_STRING + '/home-feed', homeFeedRoutes);

// This will make media/images public
app.use('/media', express.static('media'));

module.exports = app;