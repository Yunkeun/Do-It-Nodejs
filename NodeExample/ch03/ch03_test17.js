// closure : 내부함수가 자신을 만들어준 외부함수 안에 있는 변수의 값을 그대로 유지하면서 참조할 수 있다. ex) count

function add(a, b, callback) {
    var result = a + b;
    callback(result);

    var count = 0;
    var history = function() {
        count += 1;
        return count + ' : ' + a + ' + ' + b + ' = ' + result;
    };
    
    return history;
}

var add_history = add(20, 200, function(result) {
    console.log('더하기 결과 : ' + result);
});

console.log('add_history의 자료형 : ' + typeof(add_history));
console.log('결과값으로 받은 함수 실행 : ' + add_history());
console.log('결과값으로 받은 함수 실행 : ' + add_history());
console.log('결과값으로 받은 함수 실행 : ' + add_history());