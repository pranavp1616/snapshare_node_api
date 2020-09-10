const mongoose = require('mongoose');

const PhotoPostSchema = mongoose.Schema(
    {
        _id : mongoose.Schema.Types.ObjectId,
        uploaded_by : {type: mongoose.Schema.Types.ObjectId, ref:'UserModel', required:true},
        hashtags : mongoose.Schema.Types.String
    }
);

module.exports = mongoose.model('PhotopostModel',PhotoPostSchema);