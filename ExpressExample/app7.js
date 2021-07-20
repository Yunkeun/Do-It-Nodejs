var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');

var bodyParser = require('body-parser');

var app = express();

app.set('port', process.env.PORT || 3000);
// path.join : 상위폴더와 하위폴더 또는 파일 이름을 붙여줄 수 있다.
    // __dirname : app7.js 가 실행되는 폴더의 path
    // 'public'으로 붙여주기
app.use(static(path.join(__dirname, 'public')));
// 앞에 '/public' 을 붙여줌으로써 public path를 통해 접근 가능
app.use('/public', static(path.join(__dirname, 'public')));

// bodyParser 설정 등록
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(function(req, res, next) {

    // body.name : POST 방식 없다면 query.name GET방식     (명확하게 POST만 쓰인다면 뒷부분 넣을 필요 X 모호하다면 넣기)
    var paramId = req.body.id || req.query.id;
    
    
    res.send('<h3>서버에서 응답. User-Agent -> ' + userAgent + '</h3><h3>Param Id -> ' + paramId + '</h3>');
});

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('익스프레스로 웹 서버를 실행함 : ' + app.get('port'));
});