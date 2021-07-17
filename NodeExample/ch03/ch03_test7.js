// 객체의 속성을 미리 정의하기
var person = {
    name:'소녀시대',
    age:20,
    add:function(a, b) {
        return a + b;
    }
};

console.log('더하기 : ' + person.add(40, 40));