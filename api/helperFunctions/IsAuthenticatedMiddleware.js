const UserModel = require('../models/UserModel');
const getTokenFromHeader = require('./getTokenFromHeader');

module.exports = function(req, res, next) {
    UserModel.findOne({
            auth_token: getTokenFromHeader(req)
        })
        .exec()
        .then(function(user) {
            if (user) {
                req.user = user;
                next();
            } else
                return res.status(401).json({
                    response: 'Unauthorized'
                });
        })
        .catch(function() {
            return res.status(401).json({
                response: 'Unauthorized'
            })
        });
}