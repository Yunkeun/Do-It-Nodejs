// routes/user.js : user 관련 routes


var login = function(req, res) {
    console.log('process/login 라우팅 함수 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword);
    
    var database = req.app.get('database');
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
};

var adduser = function(req, res) {
    console.log('/process/adduser 라우팅 호출됨.');
    
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.id;
    var paramName = req.body.name || req.query.name;
    
    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword + ', ' + paramName)
    
    var database = req.app.get('database');
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
};

var listuser = function(req, res) {
    console.log('/process/listuser 라우팅 함수 호출됨.');
    
    var database = req.app.get('database');
    if (database) {
        // static으로 등록한 함수는 별도로 메소드를 정하지 않아도 된다.
        database.UserModel.findAll(function(err, results) {
            if (err) {
                console.log('에러 발생');
                res.writeHead(400, {"Content-Type":"text/html; charset=utf-8"});
                res.write('<h1>Error occurred</h1>');
                res.end();
                return;
            }
            if (results) {
                console.dir(results);
                
                res.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
                res.write("<h3>User List</h3>");
                res.write("<div><ul>");
                
                for (var i = 0; i < results.length; i++) {
                    var curId = results[i]._doc.id;
                    var curName = results[i]._doc.name;
                    res.write("    <li>#" + i + " -> " + curId + ", " + curName + "</li>");
                }
                res.write("</ul</div>");
                res.end();
            }
            else {
                console.log('에러 발생');
                res.writeHead(400, {"Content-Type":"text/html; charset=utf-8"});
                res.write('<h1>Error, No user was retrieved.</h1>');
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
};


var authUser = function(db, id, password, callback) {
    console.log('authUser 호출됨 : ' + id, ', ' + password);
    var user = new UserModel({"id":id, "password":password})//, "name":name})

    // static으로 추가한 메서드(findById)를 이용해서 로그인 확인 기능 만들기
    db.UserModel.findById(id, function(err, results) {
        if (err) {
            callback(err, null);
            return;
        }
        console.log('아이디 %s로 검색됨');
        if (results.length > 0) {
            new UserModel({id:id});
            var authenticated = user.authenticate(password, results[0]._doc.salt, results[0]._doc.hashed_password);
               
            if (authenticated) {
                console.log('비밀번호 일치함.');
                callback(null, results);
            }
            else {
                console.log('비밀번호 일치하지 않음');
                callback(null, null);
            }
        }
        else {
            console.log('아이디 일치하는 사용자 없음.');
        }
    });
};

// db에 insert 한 후 callback으로 정상적으로 insert 되었는지 알려주기
var addUser = function(db, id, password, name, callback) {
    console.log('addUser 호출됨 : ' + id + ', ' + password + ', ' + name);
    
    var user = new db.UserModel({"id":id, "password":password, "name":name})
    
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




module.exports.login = login;
module.exports.adduser = adduser;
module.exports.listuser = listuser;