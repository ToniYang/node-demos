/**
 * Created by yangyuhan on 10/27/15.
 */
var request = require("request");
var iconv = require('iconv-lite');


iconv.defaultCharUnicode();


var baseUrl = "http://zu.sh.fang.com/";
var pages = [];
for(var f = 31;f<132;f++){
    var url = baseUrl + "house/i" + f + "/";
    pages.push(url);
}

request.get({
    url:pages[0],
    encoding : null
}, function (err,res,body) {
    console.log(iconv.decode(body, 'gb2312'));
});