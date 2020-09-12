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
            .then((result) => {
                const data = result.map(i=>foo(i))
                resolve(data);
            })
            .catch((err) => {
                reject(err)
            });
    })
}

function foo(i){
    return {
        id: i._id,
        uploaded_by : i.uploaded_by,
        image : i.image,
        hashtags : i.hashtags,
        is_liked : true,
        date_created : i.date_created,
        total_likes : 10,
        total_comments : 10 
    };
}

module.exports = getAllPhotoposts; 