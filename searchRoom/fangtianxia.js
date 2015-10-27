/**
 * Created by yangyuhan on 10/26/15.
 */
var request = require("request");
//var baidApi = require('./baiduApi');
var house = require('./mongo.js');
var baseUrl = "http://zu.sh.fang.com/";
//var urlOption = require("url");
//var cheerio = require('cheerio');
//var iconv = require('iconv-lite');

var phantom = require('phantom');
var pages = [];
for(var f = 31;f<132;f++){
    var url = baseUrl + "house/i" + f + "/";
    pages.push(url);
}
phantom.create(function (ph) {
    pages.forEach(function (item) {
        ph.createPage(function (page) {
            page.open(item, function (status) {
                    page.evaluate(function () {
                        var $ =window.$;
                        var mesWantToGet =[];
                        for(var i =1 ;i<31;i++){
                            var num = i >9 ? i : "0" + i;
                            mesWantToGet.push({
                                address : "#rentid_B04_"+num +" > dd > p.gray6.mt12 > span",
                                money : "#rentid_B04_"+num+" > dd > div > p.mt5.alignR > span",
                                url : "#rentid_B04_"+num+" > dd > p.title > a"
                            });
                        }
                        var results = [];
                        mesWantToGet.forEach(function (value) {
                            if($(value.url).attr("href")){
                                var ad = $(value.address).text();
                                var mo = $(value.money).text();
                                var ur = $(value.url).attr("href");
                                results.push({
                                    address : ad,
                                    money : mo,
                                    url : ur
                                })
                            }
                        });
                        return results;
                    }, function (result) {
                        result.forEach(function (item) {
                           var hostItem = new house(item);
                            hostItem.save();
                        });
                        ph.exit();
                    });
                });
            })
        })
});

//iconv.extendNodeEncodings();

//function collection(){
//    var pages = [];
//    for(var f = 31;f<32;f++){
//        var url = baseUrl + "house/i" + f + "/";
//        pages.push(url);
//    }
//
//    var mesWantToGet =[];
//
//    for(var i =1 ;i<31;i++){
//        var num = i >9 ? i : "0" + i;
//        mesWantToGet.push({
//            address : "#rentid_B04_"+num +" > dd > p.gray6.mt12 > span",
//            money : "#rentid_B04_"+num+" > dd > div > p.mt5.alignR > span",
//            url : "#rentid_B04_"+num+" > dd > p.title > a"
//        });
//    }
//
//    pages.forEach(function (path) {
//        var options = {
//            url: path,
//            encoding: "gbk3212",
//            headers: {
//                'User-Agent': 'request'
//            }
//        };
//        request(options, function (err,res,body) {
//            //body = iconv.encode(body,"gbk3212");
//            console.log(body);
//            $ = cheerio.load(body);
//            env(body, function (errors,window) {
//                var $ = require('jquery')(window);
//                mesWantToGet.map(function (item) {
//                    if($(item.url).attr("href")){
//                        var ad = $(item.address).text();
//                        var mo = $(item.money).text();
//                        var ur = urlOption.resolve(baseUrl,$(item.url).attr("href"));
//                        baidApi(ad,{
//                            address : ad,
//                            money : mo,
//                            url:ur
//                        })
//                    }
//                })
//            });
//        });
//        //var html = "";
//        //http.get("http://www.baidu.com",function(res){
//        //    res.on('data', function(d) {
//        //        html += d;
//        //    }).on("end", function () {
//        //        env(html, function (errors,window) {
//        //            var $ = require('jquery')(window);
//        //            mesWantToGet.map(function (item) {
//        //                if($(item.url).attr("href")){
//        //                    var ad = $(item.address).text();
//        //                    var mo = $(item.money).text();
//        //                    var ur = urlOption.resolve(baseUrl,$(item.url).attr("href"));
//        //                    baidApi(ad,{
//        //                        address : ad,
//        //                        money : mo,
//        //                        url:ur
//        //                    })
//        //                }
//        //            })
//        //        });
//        //    });
//        //});
//    })
//}



//collection();