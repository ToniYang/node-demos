/**
 * Created by yangyuhan on 10/2/15.
 */
var http = require('http');
var server = http.createServer(function (req,res) {
    res.writeHead(200,{'Content-Type':'text/plain'});
    setTimeout(function () {
        res.end('hello world')
    },10000)
}).listen(13337,'localhost');
