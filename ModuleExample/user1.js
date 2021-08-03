// user1.js : 모듈 파일

// exports 전역 객체 사용

// getUser 속성 추가하여 함수 할당하기      (getUser : 사용자 정보를 리턴받는 함수)
exports.getUser = function() {
    return {id:'test01', name:'yunyun'};
};

// group 속성 추가하여 객체 할당하기
exports.group = {id:'group01', name:'그룹01'};

