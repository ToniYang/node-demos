/**
 * Created by yangyuhan on 10/26/15.
 */
var request = require("request");
//var baidApi = require('./baiduApi');
//var house = require('./mongo.js');
var baseUrl = "http://zu.sh.fang.com/";
var fs = require("fs");
//var urlOption = require("url");
//var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var zlib = require('zlib');
var select = require('xpath.js')
    , dom = require('xmldom').DOMParser;
//var phantom = require('phantom');
var pages = [];
for(var f = 1;f<2;f++){
    var url = baseUrl + "house/i3" + f + "/";
    pages.push(url);
}
//phantom.create(function (ph) {
//    pages.forEach(function (item) {
//        ph.createPage(function (page) {
//            page.open(item, function (status) {
//                    page.evaluate(function () {
//                        var $ =window.$;
//                        var mesWantToGet =[];
//                        for(var i =1 ;i<31;i++){
//                            var num = i >9 ? i : "0" + i;
//                            mesWantToGet.push({
//                                address : "#rentid_B04_"+num +" > dd > p.gray6.mt12 > span",
//                                money : "#rentid_B04_"+num+" > dd > div > p.mt5.alignR > span",
//                                url : "#rentid_B04_"+num+" > dd > p.title > a"
//                            });
//                        }
//                        var results = [];
//                        mesWantToGet.forEach(function (value) {
//                            if($(value.url).attr("href")){
//                                var ad = $(value.address).text();
//                                var mo = $(value.money).text();
//                                var ur = $(value.url).attr("href");
//                                results.push({
//                                    address : ad,
//                                    money : mo,
//                                    url : ur
//                                })
//                            }
//                        });
//                        return results;
//                    }, function (result) {
//                        result.forEach(function (item) {
//                           var hostItem = new house(item);
//                            hostItem.save();
//                        });
//                        ph.exit();
//                    });
//                });
//            })
//        })
//});

//iconv.extendNodeEncodings();

function collection(){

    var mesWantToGet =[];
    //浦东
    ///html/body/div[5]/div[5]/div[@id='rentid_66']/dl[@id='rentid_B04_01']/dd/p[2]/a[1]/span/text()
    ///html/body/div[5]/div[5]/div[@id='rentid_66']/dl[@id='rentid_B04_02']/dd/p[2]/a[1]/span/text()
    ///html/body/div[5]/div[5]/div[@id='rentid_66']/dl[@id='rentid_B04_01']/dd/p[2]/a[2]/span/text()
    ///html/body/div[5]/div[5]/div[@id='rentid_66']/dl[@id='rentid_B04_02']/dd/p[2]/a[2]/span/text()
    ///html/body/div[5]/div[5]/div[@id='rentid_66']/dl[@id='rentid_B04_01']/dd/p[2]/a[3]/span/text()
    ///html/body/div[5]/div[5]/div[@id='rentid_66']/dl[@id='rentid_B04_02']/dd/p[2]/a[3]/span/text()
    ///html/body/div[5]/div[5]/div[@id='rentid_66']/dl[@id='rentid_B04_01']/dd/p[2]/span/text()
    ///html/body/div[5]/div[5]/div[@id='rentid_66']/dl[@id='rentid_B04_02']/dd/p[2]/span/text()
    ///html/body/div[5]/div[5]/div[@id='rentid_66']/dl[@id='rentid_B04_12']/dd/p[2]/a[1]/span/text()

    ///html/body/div[5]/div[5]/div[@id='rentid_66']/dl[@id='rentid_B04_12']/dd/div/p[2]/span/text()
    ///html/body/div[5]/div[5]/div[@id='rentid_66']/dl[@id='rentid_B04_13']/dd/div/p[2]/span/text()

    ///html/body/div[5]/div[5]/div[@id='rentid_66']/dl[@id='rentid_B04_13']/dt/a/@href

    ///html/body/div[5]/div[5]/div[@id='rentid_66']/dl[@id='rentid_B04_14']/dd/p[2]/a[1]/span/text()
    for(var i =1 ;i<31;i++){
        var num = i >9 ? i : "0" + i;
        mesWantToGet.push({
            address01 : "/html/body/div[5]/div[5]/div[@id='rentid_66']/dl[@id='rentid_B04_"+num+"']/dd/p[2]/a[1]/span/text()",
            address02 : "/html/body/div[5]/div[5]/div[@id='rentid_66']/dl[@id='rentid_B04_"+num+"']/dd/p[2]/a[2]/span/text()",
            address03 : "/html/body/div[5]/div[5]/div[@id='rentid_66']/dl[@id='rentid_B04_"+num+"']/dd/p[2]/a[3]/span/text()",
            address04 : "/html/body/div[5]/div[5]/div[@id='rentid_66']/dl[@id='rentid_B04_"+num+"']/dd/p[2]/span/text()",
            money : "/html/body/div[5]/div[5]/div[@id='rentid_66']/dl[@id='rentid_B04_"+num+"']/dd/div/p[2]/span/text()",
            url : "/html/body/div[5]/div[5]/div[@id='rentid_66']/dl[@id='rentid_B04_"+num+"']/dt/a/@href"
        });
    }

    pages.forEach(function (path) {
        var options = {
            url: path,
            encoding: null
        };
        request(options, function (err,res,body) {
            try{
                zlib.gunzip(body, function (err,decode) {
                    var html = iconv.decode(decode, 'gb2312');
                    var doc = new dom().parseFromString(html,"text/html");
                    mesWantToGet.map(function (item) {
                        if(select(doc, item.address01) && select(doc, item.address01)[0] && select(doc, item.address01)[0].data){
                            var ad01 = select(doc, item.address01)[0].data;
                            var ad02 = select(doc, item.address02)[0].data;
                            var ad03 = select(doc, item.address03)[0].data;
                            var ad04 = select(doc, item.address04)[0].data;
                            var mo = select(doc, item.money)[0].data;
                            var ur = select(doc, item.url)[0].value;
                            console.log(ad01 + ad02 + ad03 + ad04);
                            console.log(mo);
                            console.log(ur);
                            //var host = new houseCol({
                            //    address : ad,
                            //    money : mo,
                            //    url:ur
                            //});
                            //houseCol.find({url:url}, function (err,results) {
                            //    results.forEach(function (item) {
                            //        item.remove();
                            //    });
                            //    host.save();
                            //});
                        }
                    });
                });
            }catch(e){
                console.log(e);
            }

            //console.log(body);
            //$ = cheerio.load(body);
            //env(body, function (errors,window) {
            //    var $ = require('jquery')(window);
            //    mesWantToGet.map(function (item) {
            //        if($(item.url).attr("href")){
            //            var ad = $(item.address).text();
            //            var mo = $(item.money).text();
            //            var ur = urlOption.resolve(baseUrl,$(item.url).attr("href"));
            //            baidApi(ad,{
            //                address : ad,
            //                money : mo,
            //                url:ur
            //            })
            //        }
            //    })
            //});
        });
        //var html = "";
        //http.get("http://www.baidu.com",function(res){
        //    res.on('data', function(d) {
        //        html += d;
        //    }).on("end", function () {
        //        env(html, function (errors,window) {
        //            var $ = require('jquery')(window);
        //            mesWantToGet.map(function (item) {
        //                if($(item.url).attr("href")){
        //                    var ad = $(item.address).text();
        //                    var mo = $(item.money).text();
        //                    var ur = urlOption.resolve(baseUrl,$(item.url).attr("href"));
        //                    baidApi(ad,{
        //                        address : ad,
        //                        money : mo,
        //                        url:ur
        //                    })
        //                }
        //            })
        //        });
        //    });
        //});
    })
}

function test_xpath(){
    fs.readFile("../fangtianxia.html", function () {
        var doc = new dom().parseFromString(arguments[1].toString(),"text/html");
        console.log(doc);
        console.log(select(doc, "/html/head/title/text()")[0].data);
    })
};

test_xpath();


//collection();

