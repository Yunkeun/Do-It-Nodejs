var express = require('express');
var http = require('http');

var app = express();

app.set('port', process.env.PORT || 3000);

// use 이용하여 미들웨어 등록
app.use(function(req, res, next) {
    console.log('첫번째 미들웨어 호출됨.');
    
    // 웹브라우저가 웹서버로 요청하는 정보 중 헤더 정보가 있다. Request Headers 는 웹브라우저에서 요청이 들어가는 것. 그것들 중 User-Agent: ~~~ 을 가져오기
    // 즉, 클라이언트에서 보내온 헤더 확인하는 방법이다. header(name)
    var userAgent = req.header('User-Agent');
    
    // 클라이언트에서 보내온 데이터 확인하는 방법이다.
    // GET 방식의 요청 parameter 확인 : query.name      POST 방식의 요청 parameter 확인 : body.name
    var paramName = req.query.name;
    
    
    res.send('<h3>서버에서 응답. User-Agent -> ' + userAgent + '</h3><h3>Param Name -> ' + paramName + '</h3>');
});

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('익스프레스로 웹 서버를 실행함 : ' + app.get('port'));
});