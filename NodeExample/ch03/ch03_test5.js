var person = {};

person.name = '소녀시대';
person['age'] = 20;
// 객체 속성에 함수 할당
person.add = function(a, b) {
    return a + b;
};

console.log('더하기 : ' + person.add(20, 20));
