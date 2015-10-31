/**
 * Created by yangyuhan on 10/27/15.
 */
var request = require("request");
var iconv = require('iconv-lite');
var zlib = require('zlib');


var baseUrl = "http://zu.sh.fang.com/";
var pages = [];
for(var f = 1;f<2;f++){
    var url = baseUrl + "house/i3" + f + "/";
    pages.push(url);
}

//request.get({
//    url:pages[0],
//    encoding : null
//}, function (err,res,body) {
//    zlib.gunzip(body, function (err,decode) {
//        console.log(iconv.decode(decode, 'gb2312'));
//    })
//});

request.get({
    url:"http://m.amap.com/?k=高德",
    encoding : null
}, function (err,res,body) {
    console.log(body.toString());
});