function add(a, b) {
    return a + b;
}

// 익명 함수
var add2 = function (a, b) {
    return a + b;
}

var result = add(10, 10);
console.log('더하기 결과 : ' + result);
var result2 = add2(100, 100);
console.log('더하기 결과 : ' + result2);
