/**
 * Created by yangyuhan on 10/27/15.
 */
var HouseCol = require("./mongo.js");
var api = require("./baiduApi.js");

var test = new HouseCol({
    url : "http://www.iwjw.com/chuzu/VZB-lTX1B2I/?from=0101&p=2"
});
//HouseCol.findOneAndUpdate({"url":"http://www.iwjw.com/chuzu/pBic0MRpgwo/?from=0101&p=2"},{
//    $set:{
//        toWork : 1000
//    }
//}, function (err,result) {
//    console.log(arguments);
//});
//HouseCol.find({url:"http://www.iwjw.com/chuzu/VZB-lTX1B2I/?from=0101&p=2"}, function (err,results) {
//    console.log(err);
//    console.log(results);
//   results.forEach(function (item) {
//       item.remove();
//   });
//    test.save();
//});

//HouseCol.remove({url:"http://www.iwjw.com/chuzu/VZB-lTX1B2I/?from=0101&p=2"});
//HouseCol.find({"url":"http://www.iwjw.com/chuzu/a5gyCIzsJPg/?from=0101&p=2"}, function (err,results) {
//    results.forEach(function (item) {
//        //item.toWork = 3000;
//        //console.log(item._id);
//        //item.update({"_id":item._id},{"$set":item}, function (arguments) {
//        //    console.log(arguments)
//        //});
//
//
//        api(item.address,item);
//        //item.toWork = 1000;
//        //item.update({},{"$set":item}, function (err) {
//        //    console.log(arguments);
//        //});
//        //console.log(item);
//    });
//    //for(var i = 0;i<7000;i++){
//    //    api(results[i].address,results[i]);
//    //}
//});
