var express = require('express');
var http = require('http');

var app = express();

app.set('port', process.env.PORT || 3000);

// use 이용하여 미들웨어 등록
app.use(function(req, res, next) {
    console.log('첫번째 미들웨어 호출됨.');
    
    // redirect 함수를 사용하여 다른 요청 path로 이동 
    res.redirect('http://google.co.kr');
});

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('익스프레스로 웹 서버를 실행함 : ' + app.get('port'));
});