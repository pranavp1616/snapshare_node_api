const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        _id : mongoose.Schema.Types.ObjectId,
        username : { type:String, required:true },
        email : { type:String, required:true },
        password  : { type:String, required:true },
        date_created : mongoose.Schema.Types.Date
    }
);

module.exports = mongoose.model('UserModel', UserSchema);