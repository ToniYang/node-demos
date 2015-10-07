/**
 * Created by yangyuhan on 9/19/15.
 */


function runTask (tasks,callBack){
    var flag = {};
    var index = 0;
    function run(){
        tasks[index](function (err) {
            if(err){
                callBack(err);
            }else{
                index ++;
                if(index > tasks.length -1){
                    callBack();
                    return;
                }
                run();
            }})
    }
    run();
}