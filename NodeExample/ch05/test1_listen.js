var http = require('http');

// 웹 서버 객체 리턴
var server = http.createServer();

var host = '172.26.96.1'
var port = 3000;

// 클라이언트 요청 대기 - listen
// 50000: 동시 접속 가능 클라이언트 수 (일반적으로 성능 문제 때문에 제한을 둔다.)
server.listen(port, host, 50000, function() {
    console.log('웹서버가 실행되었습니다. -> ' + host + ':' + port);
});

//