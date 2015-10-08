/**
 * Created by yangyuhan on 10/7/15.
 */
var points = [12,43,98,100,4,23,56];

points.sort(function (a,b) {
   return a-b;
});

console.log(points.toString());


//函数式编程的特点，可以传入函数作为参数，最大限度的重用代码。

var result = points.map(function (value,index,obj) {
    if(index >2){
        return value;
    }
});

console.log(result[0]);
console.log(result.toString());
console.log(points.toString());

//map测试，map给的数组多长，返回多长，没有返回的，返回成undefined。


var result02 = points.reduce(function (current,next,index,obj) {
    return current + next ;
});

console.log(result02);

//reduce是对数组中的值进行操作，例如求和或者求积，最后返回一个结果。

var result03 = points.reduceRight(function (current,next,index,obj) {
    return current + next;
});

console.log(result03);

//reduceRight就是从右边开始进行reduce操作  reduce翻译过来就是：减少，归纳。

var result04 = points.filter(function (value,index,obj) {
        if(index >2) return value;
});

console.log(result04.toString());

//filter就是过滤操作和map的区别，如果没有返回不会补上undefined，这样输入和输出的数组个数可以不一样。

var result05 = points.every(function (value,index,obj) {
    return value > 4;
});

console.log(result05);

//every 返回是一个boolean类型，是每一次返回的true或者false的取并集得出的结果。

var result06 = points.some(function (value,index,ojb) {
    return value > 4;
});

console.log(result06);

//some 返回的也是一个boolean类型，是每一次返回true或者false去或集得到的结果。


