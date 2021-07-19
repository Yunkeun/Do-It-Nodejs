// on을 상속해야 하므로 EventEmitter를 불러오기
var EventEmitter = require('events').EventEmitter;
// util 모듈 추가로 불러오기
var util = require('util');

var Calc = function() {
    this.on('stop', function() {
        console.log('Calc에 stop 이벤트 전달됨.');
    });
};

// util 모듈 사용하여 상속 쉽게 하기
util.inherits(Calc, EventEmitter);

// 프로토타입 객체에 더하기 함수 추가
Calc.prototype.add = function(a, b) {
    return a + b;
};

// 프로토타입 객체를 모듈에 직접 할당
module.exports = Calc;