const PhotoPostModel = require('../models/PhotoPostModel');

const POST_PER_PAGE = 10;

function getAllPhotoposts(condition, pageNo, req_username) {
    return new Promise(function(resolve, reject) {
        PhotoPostModel
            .find(condition)
            .limit(POST_PER_PAGE)
            .sort({
                date_created: -1
            })
            .select('_id uploaded_by image hashtags date_created likes comments')
            .exec()
            .then((result) => {
                const data = result.map(i=>foo(i, req_username))
                resolve(data);
            })
            .catch((err) => {
                reject(err)
            });
    })
}

function foo(i, req_username){
    var is_liked = false;
    if(i.likes.get(req_username))
        is_liked = true;

    return {
        id: i._id,
        uploaded_by : i.uploaded_by,
        image : i.image,
        hashtags : i.hashtags,
        'is_liked' : is_liked,
        date_created : i.date_created.toString(),
        total_likes : i.likes.size,
        total_comments : i.comments.size 
    };
}

module.exports = getAllPhotoposts; 