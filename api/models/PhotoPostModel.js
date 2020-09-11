const mongoose = require('mongoose');

const LikeSchema = mongoose.Schema({  username_as_key : mongoose.Schema.Types.String });

const PhotoPostSchema = mongoose.Schema(
    {
        _id :   mongoose.Schema.Types.ObjectId,
        uploaded_by : { type: mongoose.Schema.Types.ObjectId, 
                        ref:'UserModel', 
                        required:true
                    },
        hashtags : mongoose.Schema.Types.String,
        date_created : mongoose.Schema.Types.Date,
        likes : { type: mongoose.Schema.Types.Map, of:String } // Hashmap (with username as key) - O(1) for lookup(already liked) insertion(like) and deletion(dislike)
    }
);

module.exports = mongoose.model('PhotopostModel',PhotoPostSchema);