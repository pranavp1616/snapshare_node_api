const mongoose = require('mongoose');

const LikeSchema = mongoose.Schema({
    date_created: mongoose.Schema.Types.Date
});

const CommentSchema = mongoose.Schema({
    username: mongoose.Schema.Types.String,
    comment: mongoose.Schema.Types.String,
    date_created: mongoose.Schema.Types.Date
});

const PhotoPostSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    uploaded_by: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    image: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    hashtags: mongoose.Schema.Types.String,
    date_created: mongoose.Schema.Types.Date,

    // Hashmap (with username as key) - O(1) for lookup(already liked) insertion(like) and deletion(dislike)
    likes: {
        type: mongoose.Schema.Types.Map,
        of: LikeSchema
    },

    // Hashmap (with comment id as key)
    comments: {
        type: mongoose.Schema.Types.Map,
        of: CommentSchema
    }
});

module.exports = mongoose.model('PhotopostModel', PhotoPostSchema);