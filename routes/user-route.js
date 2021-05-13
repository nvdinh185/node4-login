const router = require('express').Router();

const postHandler = require('../utils/post-handler');

const userHandler = require('../handlers/user-handler');
const tokenHandler = require('../handlers/token-handler');

// router.post('/request-username'
//     , postHandler.jsonProcess        //req.json_data
//     , userHandler.requestUsername   //req.username
//     , captchaHandler.createCaptcha  //req.captcha
//     , tokenHandler.requestNewToken
// );

router.post('/create-user'
    , postHandler.jsonProcess       //req.json_data
    , tokenHandler.requestNewToken
    , userHandler.createUser
);

// router.post('/authorize-token'
//     , postHandler.jsonProcess       //req.json_data
//     , tokenHandler.getToken
//     , tokenHandler.verify
//     , userHandler.getUserInfo
// );

// router.post('/login-username'
//     , postHandler.jsonProcess       //req.json_data
//     , tokenHandler.getToken
//     , tokenHandler.verify
//     , userHandler.requestUsername   //req.username
//     , userHandler.loginUsername
//     , tokenHandler.createToken365
//     , userHandler.getUserInfo
// );

module.exports = router;