console.log('argv 속성의 파라미터 수 : ' + process.argv.length);
// process : 전역객체
console.dir(process.argv);

process.argv.forEach(function(item, index) {
    console.log(index + ' : ' + item);
});