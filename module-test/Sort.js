/**
 * Created by yangyuhan on 9/25/15.
 */

function quickSort(arr){
    if(!(arr instanceof Array)){
        throw Error('arr不是数组');
    }

    for(var j = 2; j< arr.length; j++){
        var key = arr[j];
        var i = j-1;
        while(i >=0 && arr[i] > key){
            arr[i+1] = arr[i];
            i--;
        }
        arr[i + 1 ] = key;
    }
    return arr;
}

var arr = quickSort([7,8,9,6,8,9,03,56,83,02]);
console.log(arr);