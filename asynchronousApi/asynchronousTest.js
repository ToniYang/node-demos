/**
 * Created by yangyuhan on 10/7/15.
 */
setImmediate(function () {
    console.log("setImmediate 延时执行");
});

process.nextTick(function () {
    console.log("nextTick 延时执行");
});
console.log("正常执行");

//nextTick 先于setImmediate执行  nextTick属于idle观察者，setTmmediate属于check观察者。
// idle观察者先于I/O观察者，I/O观察者check观察者，check观察者又优先于setTimeout and setInterval

