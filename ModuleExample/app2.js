var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
// 에러 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

var user = require('./routes/user');

var config = require('./config');
var database_loader = require('./database/database_loader');
var route_loader = require('./routes/route_loader');

// 암호화 모듈 crypto
var crypto = require('crypto');

var app = express();

console.log('config.server_port -> ' + config.server_port);

app.set('port', config.server_port || 3000);
app.use('/public', static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(expressSession({
    secret:'my key',
    resave:true,
    saveUninitialized:true
}));

function createUserSchema(database) {
    database.UserSchema = require('./database/user_schema').createSchema(mongoose);
    
    database.UserModel = mongoose.model('users3', database.UserSchema);
    console.log('UserModel 정의함.');
}

route_loader.init(app, express.Router());

// 404 에러 페이지 처리
var errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
});

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('익스프레스로 웹 서버를 실행함 : ' + app.get('port'));
    // 웹서버가 실행되는 상태 확인 후 데이터베이스 연결
    database_loader.init(app, config);
});