console.log('안녕하세요.');

console.log('숫자입니다. %d', 10);
console.log('문자열입니다. %s', '안녕');

var person = {
    name:'소녀시대',
    age:20
};
console.log('자바스크립트 객체입니다. %j', person);
console.log('person.name(percent-j) : %j', person.age);
console.log('person.name(percent-d) : %d', person.age);
console.log('person.name(percent-j) : %j', person.name);
console.log('person.name(percent-s) : %s', person.name);

var num = person.age + 10;
console.log('%s의 나이 더하기 10은 %d입니다.', person.name, num);

// console.dir 을 통해 자바스크립트 객체를 그대로 출력해준다.
console.dir(person);

// 걸린 시간 확인 : time ~ timeEnd
console.time('duration_time');
var result = 0;
for (var i = 0; i < 10000; i++) {
    result += i;
}
console.log('result: %d', result)
console.timeEnd('duration_time');

// 현재 파일에 대한 Path (__filename : 전역객체)
console.log('파일 이름  %s', __filename);
// 현재 파일이 어떤 폴더에 있는지 Path (__dirname : 전역객체)
console.log('패스 : %s', __dirname);