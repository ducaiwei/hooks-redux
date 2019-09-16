function add1(str) {
    return str + '1';
}
function add2(str) {
    return str + '2';
}
function add3(str) {
    return str + '3';
}
let result = add3(add2(add1('zhufeng')));
console.log(result);
// 
function compose(...fns) { // fns [add3, add2, add1]
    return fns.reduce((a, b) => (...args) => a(b(...args)))
}
// 中间件
let result1 = compose(add3, add2, add1)('zhufeng');
console.log(result1);