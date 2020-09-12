# SNAPSHARE API
Node JS (Express)
using Mongo DB (using Mongoose ODM)

API(s)
POST    api/user/register
POST    api/user/login

GET     api/home-feed/page/:pagenumber
GET     api/myprofile/page/:pagenumber
GET     api/friend/:friendname/page/:pagenumber
GET     api/search/:pattern/page/:pagenumber

POST    api/photopost/create
DELETE  api/photopost/delete/:photoid

POST    api/like/:photoid
GET     api/like/:photoid

POST    api/comment/:photoid
GET     api/comment/:photoid
DELETE  api/comment/:photoid/:commentid


# ENVIRONMENT VARIABLES 
cmd : $set in windows 
cmd : $export in linux

(For server port - default 3000)
    set port <port-number>

(For AWS S3 file uploads)
    set AWS_BUCKET_NAME=<bucket-name>
    set AWS_ACCESS_ID=****
    set AWS_SECRET=****
