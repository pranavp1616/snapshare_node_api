const PhotoPostModel = require('../models/PhotoPostModel');

const POST_PER_PAGE = 10;

function getAllPhotoposts(condition, pageNo) {
    return new Promise(function(resolve, reject) {
        PhotoPostModel
            .find(condition)
            .sort({
                date_created: -1
            })
            .limit(POST_PER_PAGE)
            .select('_id uploaded_by image hashtags date_created')
            .exec()
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err)
            });
    })
}


module.exports = getAllPhotoposts; 