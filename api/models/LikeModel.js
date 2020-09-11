const mongoose = require('mongoose');

const LikeSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        image : {   type: mongoose.Schema.Types.ObjectId, 
                    ref:'PhotopostModel', 
                    required:true
                },
        by :    {   type: mongoose.Schema.Types.ObjectId, 
                    ref:'UserModel', 
                    required:true
                },
        date_created : mongoose.Schema.Types.Date
    }
);

module.exports = mongoose.model('LikeModel',LikeSchema);