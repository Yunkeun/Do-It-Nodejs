function add(a, b, callback) {
    var result = a + b;
    callback(result);
    
    var history = function() {
        return a + ' + ' + b + ' = ' + result;
    };
    
    return history;
}

// 자바스크립트에서는 변수에 일반 값이 들어있는지, 함수가 들어있는지 코드만 봐서는 알 수 없다. => typeof로 찍어봐야 함
var add_history = add(20, 200, function(result) {
    console.log('더하기 결과 : ' + result);
});

console.log('add_history의 자료형 : ' + typeof(add_history));
console.log('결과값으로 받은 함수 실행 : ' + add_history());