var express = require('express');
var http = require('http');

var app = express();

app.set('port', process.env.PORT || 3000);


app.get('/favicon.ico', (req, res) => res.status(204));

app.use(function(req, res, next) {
    console.log('첫번째 미들웨어 호출됨.');

    req.user = 'Yun';
    
    next();
});

app.use(function(req, res, next) {
    console.log('두번째 미들웨어 호출됨.');
    
    // 여러 형태로 보내기
    
    // app3.js의 writeHead와 end 메소드 두 번 호출한 것 대신 send 메소드를 사용하여 메소드를 한 번만 호출하여 간단하게 사용이 가능하다.
    // res.send('<h1>서버에서 응답한 결과입니다. : ' + req.user + '</h1>'); 
    
    var person = {name:'소녀시대', age:20};
    // 자바스크립트 객체로 보낼 수도 있다. -> json format으로 넘어옴
    // res.send(person);
    
    // json 문자열로 변경하여 보내기
    var personStr = JSON.stringify(person);
    // res.send(personStr);
    
    // type을 지정해서 보내기
    res.writeHead(200, {"Content-Type":"application/json; charset=utf-8"});
    res.write(personStr);
    res.end();
})

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('익스프레스로 웹 서버를 실행함 : ' + app.get('port'));
});