/**
 * Created by yangyuhan on 9/19/15.
 */
var data = {
    "key  " : "value",
    "fdsf dfs" : "fds&= dfd"
};


function buildQueryString(data){
    var qStr = "";
    var isFist = true;
    Object.keys(data).join("&");
    for(var i in data){
        if(isFist){
            isFist = false;
        }else{
            qStr = qStr + "&";
        }
        var key = i;
        var value = data[i];
        key = encodeURIComponent(key);
        value = encodeURIComponent(value);
        qStr = qStr + key + "=" + value;
    }
    console.log(qStr);
}

buildQueryString(data);