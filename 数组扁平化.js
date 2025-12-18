const arr = [1, [2, [3, [4, 5]]], 6];

/*  1. flat([depth])
depth参数可选，指定要提取嵌套数组的结构深度，默认值为1， Infinity无穷大
*/
const res1 = arr.flat(1);
const res2 = arr.flat(2);
const resInfinity = arr.flat(Infinity);

console.log(res1);  // [1, 2, Array(2), 6]
console.log(res2); // [1, 2, 3, Array(2), 6]
console.log(resInfinity);  // [1, 2, 3, 4, 5, 6]

/* 2. 正则表达式
   2.1 正则表达式
   JSON.stringify() - 将JavaScript对象或值转换为JSON字符串  
 */
const resRegex1 = JSON.stringify(arr).replace(/\[|\]/g, '').split(','); // 数据类型都会变成字符串
console.log(resRegex1); //['1', '2', '3', '4', '5', '6']

/* 2.2 正则改良版本
   JSON.parse() - 将JSON字符串解析为JavaScript对象或值
*/
const resRegex2 = JSON.parse('[' + JSON.stringify(arr).replace(/\[|\]/g, '') + ']');
console.log(resRegex2); // [1, 2, 3, 4, 5, 6]

// 3. reduce()
const flatten = arr => {
    return arr.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
    }, [])
}
const resFlatten = flatten(arr);
console.log(resFlatten); // [1, 2, 3, 4, 5, 6]

// 4. 函数递归
const resFunc = [];
const fn = arr => {
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            fn(arr[i]);
        } else {
            resFunc.push(arr[i]);
        }
    }
}
fn(arr);