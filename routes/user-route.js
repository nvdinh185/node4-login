const router = require('express').Router();

const postHandler = require('../utils/post-handler');

const userHandler = require('../handlers/user-handler');
const tokenHandler = require('../handlers/token-handler');

router.post('/create-user'
    , postHandler.jsonProcess       //req.json_data
    , tokenHandler.requestNewToken
    , userHandler.createUser
);

router.post('/authorize-token'
    , postHandler.jsonProcess       //req.json_data
    , tokenHandler.getToken
    , tokenHandler.verify
    , userHandler.getUserInfo
);

router.post('/login-user'
    , postHandler.jsonProcess       //req.json_data
    , tokenHandler.getToken
    , tokenHandler.verify
    , userHandler.loginUser
);

module.exports = router;