"use strict"

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

class UserHandler {

    /**
     * Tạo user mới
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async createUser(req, res, next) {
        let user = { id: new Date().getTime(), ...req.json_data };
        // console.log(user);
        MongoClient.connect(url, (err, db) => {
            if (err) throw err;
            const dbo = db.db("login");
            dbo.collection("users").insertOne(user, function (err, res) {
                if (err) throw err;
                console.log("Number of documents inserted: " + res.insertedCount);
                db.close();
            });
        });
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ status: 'OK', user: user, token: req.token }));
    }

    /**
     * Kiểm tra đăng nhập và trả về thành công hoặc thất bại
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async loginUser(req, res, next) {
        // console.log(req.user);
        // console.log("json_data: ", req.json_data);
        if (req.user) {
            if (req.user.email === req.json_data.email) { //email của token và post là giống nhau
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ status: 'OK', message: 'Đăng nhập thành công!' }));
            } else {
                res.writeHead(435, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ status: 'NOK', message: 'Đăng nhập thất bại!' }));
            }
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ status: 'NOK', message: 'Lỗi xác thực', error: req.error }));
        }
    }

    /**
     * Trả về token
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    getUserInfo(req, res, next) {
        if (req.user) {
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ status: "OK", token: req.token }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ status: 'NOK', message: 'Lỗi xác thực', error: req.error }));
        }
    }
}

module.exports = new UserHandler();