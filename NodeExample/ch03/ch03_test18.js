var person1 = {name:'소녀시대', age:20};
var person2 = {name:'걸스데이', age:21};

// person 틀을 만들자
function Person(name, age) {
    this.name = name;
    this.age = age;
}

// person 틀을 이용한 함수 만들기
Person.prototype.walk = function(speed) {
    console.log(speed + 'km 속도로 걸어갑니다.');
};
// person 틀을 이용하여 person 만들기
var person3 = new Person('사람3', 20);
var person4 = new Person('사람4', 22);

person3.walk(10);