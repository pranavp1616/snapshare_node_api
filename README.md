<h4>stack</h4>
Node JS (Express) REST <br/>
Mongo DB (Mongoose ODM) <br/>
AWS <br/>

<h4>api</h4>
POST    api/user/register  <br/>
POST    api/user/login  <br/>
GET     api/home-feed/page/:pagenumber <br/>
GET     api/myprofile/page/:pagenumber <br/>
GET     api/friend/:friendname/page/:pagenumber <br/>
GET     api/search/:pattern/page/:pagenumber <br/>
POST    api/photopost/create <br/>
DELETE  api/photopost/delete/:photoid  <br/>
POST    api/like/:photoid  <br/>
GET     api/like/:photoid  <br/>
POST    api/comment/:photoid  <br/>
GET     api/comment/:photoid  <br/>
DELETE  api/comment/:photoid/:commentid  <br/>

<h4>ENVIRONMENT VARIABLES</h4>
(For server port - default 3000) <br/>
    set port 8000 <br/>
(For AWS S3 file uploads) <br/>
    set AWS_BUCKET_NAME=bucket-name <br/>
    set AWS_ACCESS_ID=**** <br/>
    set AWS_SECRET=**** <br/>
