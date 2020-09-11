const UserModel = require('../models/UserModel');
const getTokenFromHeader = require('./getTokenFromHeader');

module.exports = function(req,res,next) {
    console.log('auth_token check');
    UserModel.findOne({auth_token:getTokenFromHeader(req)}).exec()
    .then(function(user){
        if(user)
            next();
        else
            return res.status(401).json({response:'Not authorized'});
    })
    .catch(function(){
        return res.status(401).json({response:'Not authorized'})
    });
} 