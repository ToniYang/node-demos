/**
 * Created by yangyuhan on 10/26/15.
 */

var request = require("request");
var _ = require("underscore");
var ak = "QnLgpLhiQVbM7AoIpeIZlkKe";

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

                }

            } else {
                return {};
            }
        }catch(e){

        }

    })

}

function findPlace (name,callback,obj){
    var url = "http://api.map.baidu.com/place/v2/suggestion?";
    var option ={
        query : name,
        region : '上海市',
        output : 'json',
        ak : ak
    };
    url += _.keys(option).map(function (value) {return value+"="+ encodeURIComponent(option[value])}).toString().replace(/,/g,"&");

    request.get(url, function (err,res,body) {
        try{
            if(!err && res.statusCode ===200){
                body = JSON.parse(body);
                if(body.result && body.result[0]){
                    callback(body.result[0].name,obj);
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
            },100)
        }
    },
    wayToSchool : function (callback) {
        return function (origin,obj) {
            setTimeout(function () {
                find(origin,"上海电视大学",callback,obj);
            },100);
        }
    },
    findPlace : findPlace
};

var wayToSchool = findObj.wayToSchool(callback01);
var wayToWork = findObj.wayToWork(callback02);

function callback02 (){
    if(arguments[1] < 60 * 60){
        console.log(arguments[0]);
        console.log(arguments[2]);
    }
}

function callback01 (region,time,obj) {
    if( time < 20 * 60){
        console.log(obj);
        wayToWork(region,obj);
    }
}

var filterLocation = function (wayToSchool) {
    return function(region,obj){
        setTimeout(function () {
            findObj.findPlace(region,wayToSchool,obj);
        },100);
    }
}(wayToSchool);

 console.log(filterLocation);

module.exports = filterLocation;
