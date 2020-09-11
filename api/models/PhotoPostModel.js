const mongoose = require('mongoose');

const PhotoPostSchema = mongoose.Schema(
    {
        _id :   mongoose.Schema.Types.ObjectId,
        uploaded_by : { type: mongoose.Schema.Types.ObjectId, 
                        ref:'UserModel', 
                        required:true
                    },
        hashtags : mongoose.Schema.Types.String,
        date_created : mongoose.Schema.Types.Date,
        likes : [LikeSchema] // Make this a hash table - fast lookup and if collition means alraedy liked
    }
);

const LikeSchema = mongoose.Schema({ _id : mongoose.Schema.Types.ObjectId,
                                    username : mongoose.Schema.Types.String, 
                                    date_created:mongoose.Schema.Types.Date });

module.exports = mongoose.model('PhotopostModel',PhotoPostSchema);