var express = require('express');
var http = require('http');

var app = express();

app.set('port', process.env.PORT || 3000);

// favicon으로 인한 미들웨어 두번 호출 방지
app.get('/favicon.ico', (req, res) => res.status(204));

app.use(function(req, res, next) {
    console.log('첫번째 미들웨어 호출됨.');

    req.user = 'Yun';
    
    next(); // 미들웨어를 떠나게 됨 -> 그 다음 미들웨어가 요청을 받아서 처리하게 됨
});

app.use(function(req, res, next) {
    console.log('두번째 미들웨어 호출됨.');
    
    res.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
    res.end('<h1>서버에서 응답한 결과입니다. : ' + req.user + '</h1>');    
})

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('익스프레스로 웹 서버를 실행함 : ' + app.get('port'));
});