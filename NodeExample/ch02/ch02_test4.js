// 계산기 객체 만들기
var calc= {};

calc.add = function(a, b) {
    return a + b;
};

console.log('모듈로 분리하기 전 - calc.add : ' + calc.add(10, 10));