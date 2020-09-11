module.exports = function(req,res,next) {
    console.log('auth_token check');
    next();
} 