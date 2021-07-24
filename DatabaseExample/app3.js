var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
// 에러 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

// Mongoose는 MongoDB에서 정형화된 데이터를 보장하기 위해 스키마를 사용할 수 있도록 해주는 NodeJS 모듈
// mongodb 모듈 사용 -> mongoose 모듈 사용
var mongoose = require('mongoose');

var database;
var UserSchema;
var UserModel;
// mongodb 연결
function connectDB() {
    var databaseUrl = 'mongodb://localhost:27017/local';
    
    mongoose.Promise = global.Promise;
    mongoose.connect(databaseUrl);
    database = mongoose.connection;
    
    database.on('open', function() {
        console.log('데이터베이스에 연결됨 : ' + databaseUrl);
        
        UserSchema = mongoose.Schema({
            id: String,
            name: String,
            password: String
        });
        console.log('UserSchema 객체 정의함.');
        
        UserModel = mongoose.model('users', UserSchema);
        console.log('UserModel 객체 정의함');
    });
    
    database.on('disconnected', function() {
        console.log('데이터베이스 연결 끊어짐.');
    });
    
    database.on('error', console.error.bind(console, 'mongoose 연결 에러.'));
}

var app = express();

app.set('port', process.env.PORT || 3000);
app.use('/public', static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(expressSession({
    secret:'my key',
    resave:true,
    saveUninitialized:true
}));

var router = express.Router();

router.route('/process/login').post(function(req, res) {
    console.log('process/login 라우팅 함수 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword);
    
    if (database) {
        authUser(database, paramId, paramPassword, function(err, docs) {
            if(err) {
                console.log('에러 발생.');
                res.writeHead(400, {"Content-Type":"text/html; charset=utf-8"});
                res.write('<h1>Error occurred</h1>');
                res.end();
            }
            
            if (docs) {
                console.dir(docs);
                res.writeHead(400, {"Content-Type":"text/html; charset=utf-8"});
                res.write('<h1>Login Success</h1>');
                res.write('<div><p>User : ' + docs[0].name + '</p></div>');
                res.write('<br><br><a href="/public/login.html">Login again</a>');
                res.end();
            }
            else {
                console.log('에러 발생.');
                res.writeHead(400, {"Content-Type":"text/html; charset=utf-8"});
                res.write('<h1>User data not found</h1>');
                res.end();
            }
                
        });
    } 
    else {
        console.log('에러 발생.');
        res.writeHead(400, {"Content-Type":"text/html; charset=utf-8"});
        res.write('<h1>Not connect with database</h1>');
        res.end();
    }
});

router.route('/process/adduser').post(function(req, res) {
    console.log('/process/adduser 라우팅 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.id;
    var paramName = req.body.name || req.query.name;
    
    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword + ', ' + paramName)
    
    if (database) {
        addUser(database, paramId, paramPassword, paramName, function(err, result) {
            if (err) {
                console.log('에러 발생');
                res.writeHead(400, {"Content-Type":"text/html; charset=utf-8"});
                res.write('<h1>Error occurred</h1>');
                res.end();
                return;
            }
            
            if (result) {
                console.dir(result);
                res.writeHead(400, {"Content-Type":"text/html; charset=utf-8"});
                res.write('<h1>Add User Success</h1>');
                res.write('<div><p>User : ' + paramName + '</p></div>');
                res.end();
            }
            else {
                console.log('에러 발생');
                res.writeHead(400, {"Content-Type":"text/html; charset=utf-8"});
                res.write('<h1>Error, Add User Fail</h1>');
                res.end();
            }
        })
    }
    else {
        console.log('에러 발생.');
        res.writeHead(400, {"Content-Type":"text/html; charset=utf-8"});
        res.write('<h1>Not connect with database</h1>');
        res.end();
    }
});

app.use('/', router);

var authUser = function(db, id, password, callback) {
    console.log('authUser 호출됨 : ' + id, ', ' + password);
    
    UserModel.find({"id":id, "password":password}, function(err, docs) {
        if (err) {
            callback(err, null);
            return;
        }
        if (docs.length > 0) {
            console.log('일치하는 사용자를 찾음.');
            callback(null, docs);
        }
        else {
            console.log('일치하는 사용자를 찾지 못함.');
            callback(null, null);
        }
    });
};

// db에 insert 한 후 callback으로 정상적으로 insert 되었는지 알려주기
var addUser = function(db, id, password, name, callback) {
    console.log('addUser 호출됨 : ' + id + ', ' + password + ', ' + name);
    
    var user = new UserModel({"id":id, "password":password, "name":name})
    
    // 위의 객체를 저장하겠다.
    user.save(function(err) {
        if (err) {
            callback(err, null);
            return;
        }
        console.log('사용자 데이터 추가함.');
        callback(null, user);
    });
};

// 404 에러 페이지 처리
var errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
});

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('익스프레스로 웹 서버를 실행함 : ' + app.get('port'));
    // 웹서버가 실행되는 상태 확인 후 데이터베이스 연결
    connectDB();
});