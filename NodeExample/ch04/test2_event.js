process.on('exit', function() {
    // 실행순서 : 3
    console.log('exit 이벤트 발생함.');
});

// 2초후에 앞에 있는 함수 실행, 실행순서 : 2
setTimeout(function() {
    console.log('2초 후에 실행되었음.');
    
    process.exit();
}, 2000);


// 실행순서 : 1
console.log('2초 후에 실행될 것임.');