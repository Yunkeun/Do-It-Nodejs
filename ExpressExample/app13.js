var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');

var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

// Multer는 파일 업로드를 위해 사용되는 multipart/form-data 를 다루기 위한 node.js 의 미들웨어 입니다.
var multer = require('multer');
// 파일 관련 모듈 fs
var fs = require('fs');
// cors (다중 서버 접속 허용) - 다른 ip를 가진 곳에서 웹서버 접속 허용
var cors = require('cors');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use('/public', static(path.join(__dirname, 'public')));
app.use('/uploads', static(path.join(__dirname, 'uploads')));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(expressSession({
    secret:'my key',
    resave:true,
    saveUninitialized:true
}));

app.use(cors());

// 파일 upload를 하기 위한 설정
var storage = multer.diskStorage({
    // 목적지 설정 
    destination: function(req, file, callback) {
        callback(null, 'uploads');
    },
    filename:function(req, file, callback) {
        // callback(null, file.originalname + Date.now());  - 확장자 제외한 순수 파일이름 : file.originalname
        // 확장자 살리기 위해서는 extname
        var extension = path.extname(file.originalname);
        // 파일이름 : path.basename, 뒤에 extension 옵션을 주면서 확장자 제거
        var basename = path.basename(file.originalname, extension);
        // 즉, basename은 순수 파일이름이 되었고, extenstion은 확장자가 되었다.
        callback(null, basename + Date.now() + extension);
    }
});

// multer 를 사용한 기본 설정
var uploads = multer({
    storage:storage,
    limits:{
        files:10,   // 파일 개수 제한
        filesize:1024*1024*1024 // 파일 사이즈 제한
    }
});

var router = express.Router();

// 업로드하는 파일을 배열 형태로 받고 싶다 -> post 첫 파라미터에 uploads.array(이름, 개수) 추가
router.route('/process/photo').post(uploads.array('photo', 1), function(req, res) {
    console.log('/process/photo 라우팅 함수 호출됨.');
    
    var files = req.files;
    console.log('==== 업로드된 파일 ====');
    if (files.length > 0) {
        console.dir(files[0]);
    }
    else {
        console.log('파일이 없습니다.')
    }
    
    var originalname;
    var filename;
    var mimetype;
    var size;
    // 배열인지 확인 Array.isArray()
    if (Array.isArray(files)) {
        for(var i = 0; i < files.length; i++) {
            originalname = files[i].originalname;
            filename = files[i].filename;
            mimetype = files[i].mimetype;
            size = files[i].size;
        }
    }
    
    res.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
    res.write("<h1>파일 업로드 성공</h1>");
    res.write("<p>원본파일 : " + originalname + "</p>");
    res.write("<p>저장파일 : " + filename + "</p>");
    res.end();
});

router.route('/process/product').get(function(req, res) {
    console.log('/process/product 라우팅 함수 호출됨.');
    
    if (req.session.user) {
        res.redirect('/public/product.html');
    }
    else {
        res.redirect('/public/login2.html');
    }
});

router.route('/process/login').post(function(req, res) {
    console.log('/process/login 라우팅 함수 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword);
    
    if (req.session.user) {
        console.log('이미 로그인되어 있습니다.');
        res.redirect('/public/product.html');
    }
    else {
        req.session.user = {
            id:paramId,
            name:'소녀시대',
            authorized:true
        };
        res.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
        res.write('<h1>로그인 성공</h1');
        res.write('<br><p>Id: ' + paramId + '</p>');
        res.write('<br><br><a href="/public/product.html">상품 페이지로 이동하기</a>');
        res.end();
    }
});

router.route('/process/logout').get(function(req, res) {
    console.log('/process/logout 라우팅 함수 호출됨.');
    if (req.session.user) {
        console.log('로그아웃 합니다.');
        
        req.session.destroy(function(err) {
            if (err) {
                console.log('세션 삭제 시 에러 발생.');
                return;
            }
            
            console.log('세션 삭제 성공.');
            res.redirect('/public/login2.html');
        });
    }
    else {
        console.log('로그인되어 있지 않습니다.');
        res.redirect('/public/login2.html');
    }
    
});

app.use('/', router);

app.all('*', function(req, res) {
    res.status(404).send('<h1>요청하신 페이지는 없습니다.</h1>');
});


var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('익스프레스로 웹 서버를 실행함 : ' + app.get('port'));
});