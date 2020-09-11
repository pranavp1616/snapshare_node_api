module.exports = function(req) {
    if (req.headers.authorization)
        return req.headers.authorization.split(' ')[1];
    return '0';
}