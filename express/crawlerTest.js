/**
 * Created by yangyuhan on 10/22/15.
 */
/*
    写个爬虫的例子
    请求 网页、分析可以跳转的url、保存url
 */

var env = require('jsdom').env;
var https = require('https');
var url = require("url");
var fs = require("fs");
var html = "";
https.get('https://nodejs.org/api/',function(res){
    res.on('data', function(d) {
        html += d;
    }).on("end", function () {
        env(html, function (errors,window) {
            var $ = require('jquery')(window);
            $("a").each(function (item) {
                item.href;
            })
        });
    });
});

var urls = {};

var hostName  = 'nodejs.org';
var size = 0;
function getHtml(urlWantToGet){
    var html = "";
    if(size >100){
        return;
    }
    https.get(urlWantToGet,function(res){
        size ++;
        res.on('data', function(d) {
            html +=d;
        }).on("end", function () {
            write(html);
            env(html, function (errors,window) {
                var $ = require('jquery')(window);
                $("a").each(function (index,value) {
                    urls[value.href] = value.href;
                });

                for(var key in urls){
                        var  urlParseResult = url.parse(key);
                        if(urlParseResult.host === hostName || urlParseResult.host ===null){
                            getHtml(url.resolve(urlWantToGet,key));
                        }
                }
            });

        });
    });
}

function write(page){
    var name = "page/" + size+".html";
    fs.writeFile(name,page, function (err) {
        console.log(err);
    });
}

getHtml("https://nodejs.org/api/");