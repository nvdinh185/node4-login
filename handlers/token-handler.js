"use strict"
const jwt = require('jsonwebtoken');
const url = require('url');

const pass_sign_token = 'nvdinh_13052021';

/**
 * Phương thức này để tạo mới token
 * @param {*} req 
 * @param {*} expires 
 */
const sign = (req, expires) => {

  let timeSign = Date.now();

  let token = jwt.sign({
    email: req.json_data.email,
    time_sign: timeSign
  },
    pass_sign_token + timeSign
    ,
    {
      expiresIn: expires ? expires : 60000 // default 1 phút
    }
  );

  return token;
}

class TokenHandler {

  /**
   * Xác thực lại otp và token có hợp lệ không?
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  verify(req, res, next) {
    let userToken;
    try {
      userToken = jwt.decode(req.token);
    } catch (e) { }
    // console.log("userToken: ", userToken);
    let timeSign = userToken.time_sign;
    //xác thực token và otp truyền lên:
    //- nếu đăng ký mới hoặc đăng nhập thì phải có otp
    //- nếu xác nhận lại thì không cần otp

    jwt.verify(req.token, pass_sign_token + timeSign,
      (err, decoded) => {
        if (err) {
          console.log('Lỗi xác thực:', err.message);
          req.error = err.message;
        } else {
          // console.log('decoded:', decoded);
          req.user = decoded;
        };
        next();
      })
  }

  /**
   * Lấy token và otp truyền lên
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  getToken(req, res, next) {

    let token = req.headers['x-access-token'] || req.headers['authorization']
    // console.log('token1', token);
    if (!token) token = url.parse(req.url, true, false).query.token;
    // console.log('token2', token);
    //Nếu truyền token trong json_data
    if (!token) token = req.json_data ? req.json_data.token : undefined;
    // console.log('token3', token);

    req.token = token && token.startsWith('Bearer ') ? token.slice(7) : token;

    let otp = req.json_data ? req.json_data.otp : undefined; //lay tu json_data post
    // console.log("json_data...", req.json_data);
    req.otp = otp;
    next();
  }

  /**
   * Tạo mới 1 token
   * Trả về cho client gồm req.next_status, req.token, req.username, req.captcha.data
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  requestNewToken(req, res, next) {
    // console.log(req.json_data);
    req.token = sign(req, '10h');
    next();
  }
}

module.exports = new TokenHandler()