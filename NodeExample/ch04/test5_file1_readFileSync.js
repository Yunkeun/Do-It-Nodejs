// 파일의 전체 내용 읽어서 출력하는 프로그램 - 1. 동기식 (readFileSync)

// 파일 시스템 객체 만들기
var fs = require('fs');

// 파일을 다 읽을 때까지 대기. 다 읽은 후 결과를 리턴
var data = fs.readFileSync('./package.json', 'utf8');
console.log(data);