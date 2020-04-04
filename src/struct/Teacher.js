const User = require("./User.js");

class Teacher {
	constructor(client, response) {
		this.client = client;
		
		this.id = response.id;
		this.school_id = response.school_id;
		this.employee_type = response.employee_type;
		this.title = response.title;
		this.forename = response.forename;
		this.surname = response.surname;
	}
	
	getUser() {
		var _this = this;
		
		return new Promise(function (resolve, reject) {
			_this.client.make("GET", "/api/users?ids%5B%5D=" + _this.id, {
				referer: "/todos/issused"
			}).then(function (response) {
				resolve(new User(_this.client, response.users[0]));
			}).catch(function(err) {
				reject(err);
			});
		});
	}
}

module.exports = Teacher;