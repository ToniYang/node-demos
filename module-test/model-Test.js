/**
 * Created by yangyuhan on 9/17/15.
 */

//测试module，直接设置exports = 一个值和module.exports=一个值，哪一个起作用。

var a = "only exports";

var b = "module exports";

exports.test = a;

module.exports = b;

//测试结果，exports直接复制的属性，不能被引用到外部。只有module.exports赋值的属性，才可以引用到外部。

//但是如果是exports子层级的属性，是可以直接复制的。

//module 代表的是当前的文件模块