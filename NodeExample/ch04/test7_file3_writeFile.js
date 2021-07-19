var fs = require('fs');

fs.writeFile('ch04/output.txt', 'Hello.', function(err) {
    // error 먼저 확인 - 에러 발생시 에러 전체 출력 후 return
    if (err) {
        console.log('에러 발생.');
        console.dir(err);
        return;
    }
    console.log('output.txt 파일에 데이터 쓰기 완료함.');
});