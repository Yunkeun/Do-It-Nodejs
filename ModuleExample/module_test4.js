var user = require('./user4');

function showUser() {
    user_name = user().name;
    
    return user_name;
}

console.log('사용자 정보 -> ' + showUser());