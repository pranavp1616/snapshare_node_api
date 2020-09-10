const mongoose = require('mongoose');

const PhotoPostSchema = mongoose.Schema(
    {
        _id : mongoose.Schema.Types.ObjectId,
        hashtags : mongoose.Schema.Types.String
    }
);

module.exports = mongoose.model('PhotopostModel',PhotoPostSchema);