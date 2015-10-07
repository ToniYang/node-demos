/**
 * Created by yangyuhan on 10/7/15.
 */

process.nextTick(function () {
   console.log('nextTick test 01');
});

process.nextTick(function () {
    console.log('nextTick test 02');
});

setImmediate(function () {
   console.log('setImmediate test 01');

    process.nextTick(function () {
       console.log('强势插入');
    });

});

setImmediate(function () {
   console.log('setImmediate test 02');
});

console.log('正常执行');