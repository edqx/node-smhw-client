class ClassGroupIncomplete {
	constructor(client, response) {
		this.client = client;
		
		this.id = response.id;
		this.name = response.name;
		this.class_year = response.class_year;
		this.academic_year = response.academic_year_id;
		this.imported_via_sims = response.imported_via_sims;
		this.school_id = response.school_id;
		this.is_registration_group = response.is_registration_group;
		
		this.incomplete = true;
	}
	
	complete() {
		var _this = this;
		
		const ClassGroup = require("./ClassGroup.js");
		
		return new Promise(function (resolve, reject) {
			_this.client.make("GET", "/api/class_groups/" + _this.id, {
				referer: "/todos/issued"
			}).then(function (response) {
				resolve(new ClassGroup(_this.client, response.class_group));
			}).catch(function(err) {
				reject(err);
			});
		});
	}
}

module.exports = ClassGroupIncomplete;