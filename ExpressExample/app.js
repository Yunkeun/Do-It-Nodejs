var express = require('express');     // npm install을 통해서 express 설치 해야함

// express는 http 모듈을 내부적으로 사용하기 때문에 http 모듈 불러오기
var http = require('http');

var app = express();    // app이 express 서버 객체가 된다.

app.set('port', process.env.PORT || 3000);  // port 설정 : PORT라는 환경변수가 있다면 그것을 사용하고 없다면 3000 사용하겠다.

// express를 이용하여 웹서버가 만들어진다.
var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('익스프레스로 웹 서버를 실행함 : ' + app.get('port'));
});