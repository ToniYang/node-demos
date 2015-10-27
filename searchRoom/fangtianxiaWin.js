/**
 * Created by yangyuhan on 10/27/15.
 */
var request = require("request");





var baseUrl = "http://zu.sh.fang.com/";
var pages = [];
for(var f = 31;f<132;f++){
    var url = baseUrl + "house/i" + f + "/";
    pages.push(url);
}

request.get(pages[0], function (err,res,body) {
    console.log(body);
});