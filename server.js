const express = require('express');
const path = require('path');
const app = express();

main = (isHttp) => {

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
    next();
  });

  app.use(express.static(__dirname + '/client/www'));

  app.use('/auth', require('./routes/user-route'));

  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/www', 'index.html'));
  });

  if (isHttp) {
    const httpServer = require('http').createServer(app);
    const portHttp = process.env.PORT || isHttp;
    httpServer.listen(portHttp, () => {
      console.log("Server is running in port: " + portHttp);
    });
  }
}

const isHttp = 3000;

main(isHttp);