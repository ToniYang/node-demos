/**
 * Created by yangyuhan on 10/26/15.
 */
var iconv = require('iconv-lite');
var request = require('request');
var cheerio = require('cheerio');
//iconv.extendNodeEncodings();

var options = {
    url: 'http://sh.58.com/chuzu/?PGTID=14458628999790.43468832154758275&ClickID=1',
    //url: 'http://www.163.com',
    //url: 'http://www.baidu.com',
    //url: 'http://localhost:63342/nodeLearn/test.html',
    encoding: null,
    headers: {
        "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.71 Safari/537.36"
    }
};

var a = iconv.encode("<html>","gb2312");
console.log(a);
var b = iconv.decode(a,"gb2312");
console.log(b);
request(options, function (error, response, body) {
        //console.log(body.toString("utf-8"));
        console.log(error);
        var $ = cheerio.load(body, {decodeEntities: false});
        console.log($("title").html());
        //console.log(iconv.decode(body,"gb2312"));
        //console.log(response);
        //console.log(body);
        if (!error && response.statusCode == 200) {
            //console.log(body);
            //console.log(iconv.decode(body,'utf8'));
            //console.log(iconv.decode(body,'gb2312'));
            //console.log(iconv.decode(body,'gbk'));
            //console.log(iconv.decode(iconv.decode(body,'utf8'),"gb2312"));
        }
    }
);