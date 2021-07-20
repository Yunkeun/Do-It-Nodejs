var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');

var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use('/public', static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cookieParser());
var router = express.Router();

// 쿠키 정보에 객체 넣기
router.route('/process/setUserCookie').get(function(req, res) {
    console.log('/process/setUserCookie 라우팅 함수 호출됨.');
    
    res.cookie('user', {
        id:'yun',
        name:'소녀시대',
        authorized:true
    });
    
    res.redirect('/process/showCookie');
});

// 설정된 쿠키 정보 보기
router.route('/process/showCookie').get(function(req, res) {
    console.log('/process/showCookie 라우팅 함수 호출됨.');
    // 클라이언트 쪽으로 데이터 보내기
    res.send(req.cookies);
});

app.use('/', router);

app.all('*', function(req, res) {
    res.status(404).send('<h1>요청하신 페이지는 없습니다.</h1>');
});


var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('익스프레스로 웹 서버를 실행함 : ' + app.get('port'));
});