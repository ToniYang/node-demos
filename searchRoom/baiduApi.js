/**
 * Created by yangyuhan on 10/26/15.
 */
var HouseCol = require("./mongo.js");
var request = require("request");
var _ = require("underscore");
var ak = "2ptVg1e3yC2GiVuswBYIUNSj";

function find(origin,destination,callback,obj){
    var url = "http://api.map.baidu.com/direction/v1?";
    var option = {
        origin: origin,
        destination : destination,
        mode : 'transit',
        region : '上海',
        output : 'json',
        ak : ak
    };

    url += _.keys(option).map(function (value) {return value+"="+ encodeURIComponent(option[value])}).toString().replace(/,/g,"&");

    request.get(url, function (error, response, body) {
        try{
            body = JSON.parse(body);
            if(!error && response.statusCode === 200){
                try{
                    if(body.result.routes){
                        callback(origin,body.result.routes[0].scheme[0].duration,obj);
                    }else {
                        if(body.result.taxi){
                            callback(origin,body.result.taxi.duration,obj);
                        }
                    }
                }catch(e){
                    console.log(body);
                    console.log(e);
                }

            } else {
                return {};
            }
        }catch(e){

        }

    })

}

function findPlace (name,callback,obj){
    var url = "http://api.map.baidu.com/place/v2/search?";
    var option ={
        query : name,
        region : '上海市',
        output : 'json',
        page_size : 10,
        page_num : 0,
        region : "上海",
        ak : ak
    };
    url += _.keys(option).map(function (value) {return value+"="+ encodeURIComponent(option[value])}).toString().replace(/,/g,"&");

    request.get(url, function (err,res,body) {
        try{
            if(!err && res.statusCode ===200){
                body = JSON.parse(body);
                if(body.results && body.results[0]){
                    callback(body.results[0].name,obj);
                }else{
                    callback(name,obj);
                }
            }
        }catch(e){

        }

    })
}

var findObj = {
    wayToWork : function (callback) {
        return function (origin,obj) {
            setTimeout(function () {
                find(origin,"现代大厦",callback,obj);
            },500)
        }
    },
    wayToSchool : function (callback) {
        return function (origin,obj) {
            setTimeout(function () {
                find(origin,"火星一号商业广场",callback,obj);
            },500);
        }
    },
    findPlace : findPlace
};

var wayToSchool = findObj.wayToSchool(callback01);
var wayToWork = findObj.wayToWork(callback02);

function callback02 (region,time,obj){
    obj.toWork = time;
    HouseCol.update({"_id":obj._id},{"$set":obj});
}

function callback01 (region,time,obj) {
    obj.toScl = time;
    HouseCol.update({"_id":obj._id},{"$set":obj});
    wayToWork(region,obj);
}

var filterLocation = function (wayToSchool) {
    return function(region,obj){
        setTimeout(function () {
            findObj.findPlace(region,wayToSchool,obj);
        },100);
    }
}(wayToSchool);


module.exports = filterLocation;

