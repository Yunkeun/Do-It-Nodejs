// user1.js에 넣어둔 코드를 불러오기 -> 직접 만든 모듈은 상대 path를 사용한다.
var user1 = require('./user1');

function showUser() {
    var user_name = user1.getUser().name;    // user1 객체의 getUser 함수의 name 참조하여 리턴
    var group_name = user1.group.name;      // user1 객체의 group 객체의 name 참조하여 리턴
    
    return user_name + ', ' + group_name;
}

console.log('사용자 정보 -> ' + showUser());