// 파일의 전체 내용 읽어서 출력하는 프로그램 - 2. 비동기식 (readFile)

// 파일 시스템 객체 만들기
var fs = require('fs');

// readFile은 비동기 방식 - 파일을 다 읽을 때까지 기다리지 않고 다음 코드가 있다면 넘어감 ... 파일 다 읽으면 그때 실행
// 리턴되는 값 없고 callback 함수로 데이터를 전달 해준다.
fs.readFile('./package.json', 'utf8', function(err, data) {
    console.log(data);
});

console.log('파일을 읽는 명령 줄보다 늦게 나와도 먼저 실행된다.');
setTimeout(function() {
    console.log('2초 후에 실행되었음 - 파일을 다 읽고 실행된다.');
}, 2000);
