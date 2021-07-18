var users = [{name:'소녀시대', age:20}, {name:'걸스데이', age:22}, {name:'티아라', age:21}];

delete users[1];

console.dir(users);

users.forEach(function(elem, index) {
    console.log('원소 #' + index);
    console.dir(elem);
});

console.log('개수 : ' + users.length);
// 개수 : 3개 => 배열 원소 중간에 있는 것을 삭제할 때는 delete 사용 XXX

// splice(index, 0, 내용) : 중간에 원소를 추가할 때 사용
users.splice(1, 0, {name:'애프터스쿨', age:24});
console.dir(users);
// splice(index, 1) : 중간에 원소를 삭제할 때 사용
users.splice(2, 1)
console.dir(users);