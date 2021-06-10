"use strict"

class PostHandlers {

  /**
   * Nhận dữ liệu json_data post lên, sau đó parse sang json
   * body json => req.json_data
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  jsonProcess(req, res, next) {
    let postDataString = '';
    //Nhận json_data post lên gán cho biến postDataString
    req.on('data', (chunk) => {
      //chunk có kiểu buffer
      //biến postDataString có kiểu string
      postDataString += chunk; //cách gán này chuyển chunk từ kiểu buffer sang kiểu string
      //và gán cho biến postDataString
    });
    req.on('end', () => {
      try {
        //chuyển postDataString từ kiểu string thành dạng json
        req.json_data = JSON.parse(postDataString);
        next();
      } catch (err) {
        res.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(JSON.stringify({ message: "Lỗi chuyển đổi từ string sang json!", error: err }));
      }
    })
  }
}
module.exports = new PostHandlers();