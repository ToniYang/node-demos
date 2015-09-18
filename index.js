/**
 * Created by yangyuhan on 9/17/15.
 */

//test module
var moduleTest = require('./module-test/model-Test');
console.log(moduleTest);
//require 引用文件module的时候，需要加./才可以引用的到路径对应的module   .或者..开头表示相对路径，其他表示绝对路径


//node require 模块引用测试  建一个文件夹，然后引用它，看require是否可以找到我要引用的模块  package
var packageTest = require("./module-test/package");
console.log(packageTest);
//测试结果，优先引用packag.js中main指定的js，如果没有找到，会找index.js，如果都没有找到会报错。

