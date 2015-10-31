/**
 * Created by yangyuhan on 10/26/15.
 */
var request = require("request");
var baidApi = require('./baiduApi');
var baseUrl = "http://www.iwjw.com/chuzu/";//http://www.iwjw.com/chuzu/shanghai/o1p103/
var urlOption = require("url");
var select = require('xpath.js')
    , dom = require('xmldom').DOMParser;
//var http = require('http');
var cheerio = require('cheerio');

var fs = require("fs");

var houseCol = require("./mongo.js");

//var env = require('jsdom').env;

function collection(){
    var pages = [];
    for(var f = 1;f<101;f++){
        var url = baseUrl + "shanghai/o1p" + f + "/";
        pages.push(url);
    }

    var mesWantToGet =[];

    for(var i =1 ;i<31;i++){
        mesWantToGet.push({
            name : "/html/body/div[@id='iwjw']/div/div[2]/div[2]/div/ol/li["+i+"]/div/h4/b/a/i/text()",
            address : "/html/body/div[@id='iwjw']/div/div[2]/div[2]/div/ol/li["+i+"]/div/p[1]/text()[2]",
            money : "/html/body/div[@id='iwjw']/div/div[2]/div[2]/div/ol/li["+i+"]/div/h5/i[4]/b/text()",
            url : "/html/body/div[@id='iwjw']/div/div[2]/div[2]/div/ol/li["+i+"]/div/h4/b/a/@href"
        });
    }

    pages.forEach(function (path) {
        var options = {
            url: path,
            encoding: null,
            headers: {
                'User-Agent': 'request',
                'Accept-Language':'en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4'
            }
        };
        request(options, function (err,res,body) {
            if(!body){
                return ;
            }
            var html = body.toString("UTF-8");
            //$ = cheerio.load(html,{decodeEntities: false});
            //fs.writeFile("test.html",html);
            try{
                var doc = new dom().parseFromString(html);
                mesWantToGet.map(function (item) {
                    if(select(doc, item.address) && select(doc, item.address)[0] && select(doc, item.address)[0].data){
                        var ad = select(doc, item.address)[0].data.replace(/-|\s+/g,"");
                        var mo = select(doc, item.money)[0].data;
                        var ur = select(doc, item.url)[0].value;
                        var host = new houseCol({
                            address : ad,
                            money : mo,
                            url:ur
                        });
                        houseCol.find({url:url}, function (err,results) {
                            results.forEach(function (item) {
                                item.remove();
                            });
                            host.save();
                        });
                    }
                });
            }catch(e){
                return;
            }

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
        //http.get(path,function(res){
        //    res.on('data', function(d) {
        //        html += d;
        //    }).on("end", function () {
        //        console.log(html);
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

collection();