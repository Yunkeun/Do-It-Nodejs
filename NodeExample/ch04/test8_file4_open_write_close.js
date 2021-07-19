// 파일을 쓰기 모드로 open 하여 write하고 close 하기

var fs = require('fs');

fs.open('ch04/output.txt', 'w', function(err, fd) {
    if (err) {
        console.log('파일 오픈 시 에러 발생');
        console.dir(err);
        return;
    }
    
    var buf = new Buffer('안녕!\n반가워!');
    fs.write(fd, buf, 0, buf.length, null, function(err, fd, buffer) {
        if (err) {
            console.log('파일 쓰기 시 에러 발생');
            console.dir(err);
            return;
        }
        
        console.log('파일 쓰기 완료함.');
        
        fs.close(fd, function() {
            console.log('파일 닫기 완료함.');
        });
    });
});

// r: 읽기 모드, w: 쓰기 모드

// Buffer라는 변수에 할당을 한 후 write