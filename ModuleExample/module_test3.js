var user = require('./user3');

// ./user3의 user 객체를 그대로 사용 가능
function showUser() {
    var user_name = user.getUser().name;
    var group_name = user.group.name;
    
    return user_name + ', ' + group_name;
}

console.log('사용자 정보 -> ' + showUser());