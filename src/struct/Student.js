const ClassGroup = require("./ClassGroup.js");
const User = require("./User.js");

class Student extends User {
	constructor(client, response) {
		super(client, response);
		
		this.year = response.year;
		this.parents = response.parent_ids;
		this.registration_group = response.registration_group_id;
		this.tags = response.tags;
		this.gender = response.gender;
		this.invite_code = response.invite_code;
		this.invite_code_expirary_date = response.invite_code_expires_on;
		this.class_groups = response.class_group_ids;
		this.student_categories = response.student_category_ids;
		this.student_badges = response.student_badge_ids;
		this.student_praise_summary = response.student_praise_summary_id;
	}
	
	getClassGroups() {
		var _this = this;
		
		return new Promise(function (resolve, reject) {
			_this.client.make("GET", "/api/class_groups?student_ids%5B%5D=" + _this.id, {
				referer: "/todos/issued"
			})
			.then(function (response) {
				resolve(response.class_groups.map(_ => new ClassGroup(_this.client, _)));
			}).catch(function(err) {
				reject(err);
			});
		});
	}
}

module.exports = Student;