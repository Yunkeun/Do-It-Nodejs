function add(a, b, callback) {
    var result = a + b;
    callback(result);
}

add(10, 10, function(res) {
    console.log('콜백 함수 내의 더하기 결과 : ' + res);
});