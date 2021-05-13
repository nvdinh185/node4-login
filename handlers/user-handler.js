"use strict"

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

class UserHandler {

    /**
     * Tạo username mới
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
}

module.exports = new UserHandler();