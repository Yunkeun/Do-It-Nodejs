var calc2 = require('./calc2');

console.log('모듈로 분리한 후 - calc2.add : ' + calc2.add(30, 30));

// 시스템 변수의 OS 확인
var nconf = require('nconf');
nconf.env();
var value = nconf.get('OS');
console.log('OS 환경변수의 값 : ' + value);