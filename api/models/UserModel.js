const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    },
    firstname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    password_bkdr: {
        type: String,
        required: true
    },
    date_created: mongoose.Schema.Types.Date,
    auth_token: String 
});

module.exports = mongoose.model('UserModel', UserSchema);