/**
 * Created by yangyuhan on 10/27/15.
 */
var HouseCol = require("./mongo.js");
var api = require("./baiduApi.js");
HouseCol.find({}, function (err,results) {
    results.forEach(function (item) {
        api(item.address,item);
        //console.log(item);
    });
});
