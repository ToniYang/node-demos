/**
 * Created by yangyuhan on 10/16/15.
 */

var express = require("express");
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
var fs = require('fs');
var app = express();
var html = "";
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/save', upload.array(),function (req,res) {
    html  = req.body.arg1 ;
    res.send('ok');
});

app.get('/get', function (req,res) {
    res.set('Content-Type', 'text/html');
    res.send(new Buffer(html));
});


app.listen(7088);