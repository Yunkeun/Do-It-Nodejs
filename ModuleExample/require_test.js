// require 함수 test

var require = function(path) {
    var exports = {}
    
    exports.getUser = function() {
            return {id:'test01', name:'yunkeun'};
        };
    exports.group = {id:'group01', name:'그룹01'};
    
    return exports;
}

var user = require('...');

function showUser() {
    var user_name = user.getUser().name;
    var group_name = user.group.name;
    
    return user_name + ', ' + group_name;
}

console.log('사용자 정보 -> ' + showUser());