// user3.js : 모듈 파일

// user라는 객체 만들기
var user = {
    getUser: function() {
        return {id:'test01', name:'yunyun'};
    },
    group: {id:'group01', name:'그룹01'}
};

// user 객체 바로 할당 가능
module.exports = user;

