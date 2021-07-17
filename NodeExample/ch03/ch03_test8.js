// 배열 만들기
var names = ['소녀시대', '걸스데이', '티아라'];

// 배열 안에 객체 넣기
var users = [{name:'소녀시대', age:20}, {name:'걸스데이', age:22}];

// 만들어진 배열 내에 객체 추가하기 (push)
users.push({name:'티아라', age:21});

// length로 배열 개수 확인
console.log('사용자 수 : ' + users.length);
// 배열의 첫번째 객체의 name 속성
console.log('첫번째 사용자 이름 : ' + users[0].name)