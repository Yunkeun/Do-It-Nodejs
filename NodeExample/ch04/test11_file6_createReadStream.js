// createReadStream 을 이용해서 읽어들이기

var fs = require('fs');

var infile = fs.createReadStream('ch04/output.txt', {flags:'r'});

// 읽어들이는 과정에서 이벤트가 발생 - infile.on으로 받을 수 있다.
infile.on('data', function(data) {
    console.log('읽어들인 데이터 :\n' + data);
});

infile.on('end', function() {
    console.log('읽기 종료.');
});