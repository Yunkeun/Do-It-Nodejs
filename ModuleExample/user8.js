// 프로토타입으로 사용
function User(id, name) {
    this.id = id;
    this.name = name;
}

User.prototype.getUser = function() {
    return {id:this.id, name:this.name};
};

User.prototype.group = {id:'group01', name:'그룹01'};

User.prototype.printUser = function() {
    console.log('user 이름 : ' + this.name + ', group : ' + this.group.name);
};

// 프로토타입으로 동작하는 user
module.exports = new User('test01', 'yunkeun'); // 프로토타입 객체 User를 만들어서 test01, yunkeun 이라는 인스턴스를 추가하여 리턴