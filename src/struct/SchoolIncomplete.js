const Location = require("./Location.js");

const SchoolPrivateInfo = require("./SchoolPrivateInfo.js");
const Teacher = require("./Teacher.js");
const ClassYear = require("./ClassYear.js");
const Subject = require("./Subject.js");
const ClassGroup = require("./ClassGroup.js");

class SchoolIncomplete {
	constructor(client, response) {
		this.client = client;
		
		this.location = new Location(client, response);
		
		this.id = response.id;
		this.name = response.name;
		this.subdomain = response.subdomain;
		this.active = response.is_active;
		this.colour = response.brand_color;
		
		this.incomplete = true;
	}
	
	complete() {
		var _this = this;
		
		const School = require("./School.js");
		
		return new Promise(function (resolve, reject) {
			_this.client.make("GET", "/api/public/schools/" + _this.subdomain)
			.then(function (response) {
				resolve(new School(_this.client, response.school));
			}).catch(function(err) {
				reject(err);
			});
		});
	}
	
	getTeachers() {
		var _this = this;
		
		return new Promise(function (resolve, reject) {
			_this.client.make("GET", "/api/public/teachers", {
				query: {
					school_id: _this.id
				}
			}).then(function (response) {
				resolve(response.teachers.map(_ => new Teacher(_this.client, _)));
			}).catch(function(err) {
				reject(err);
			});
		});
	}
	
	getClassYears() {
		var _this = this;
		
		return new Promise(function (resolve, reject) {
			_this.client.make("GET", "/api/class_years", {
				query: {
					school_id: _this.id
				}
			}).then(function (response) {
				resolve(response.class_years.map(_ => new ClassYear(_this.client, _)));
			}).catch(function(err) {
				reject(err);
			});
		});
	}
	
	getSubjects() {
		var _this = this;
		
		return new Promise(function (resolve, reject) {
			_this.client.make("GET", "/api/subjects", {
				query: {
					school_id: _this.id
				}
			}).then(function (response) {
				resolve(response.subjects.map(_ => new Subject(_this.client, _)));
			}).catch(function(err) {
				reject(err);
			});
		});
	}
	
	getClassGroups() {
		var _this = this;
		
		return new Promise(function (resolve, reject) {
			_this.client.make("GET", "/api/class_groups", {
				query: {
					school_id: _this.id
				}
			}).then(function (response) {
				resolve(response.class_groups.map(_ => new ClassGroup(_this.client, _)));
			}).catch(function(err) {
				reject(err);
			});
		});
	}
	
	getRegistrationGroups() {
		var _this = this;
		
		return new Promise(function (resolve, reject) {
			_this.getClassGroups().then(function (class_groups) {
				resolve(class_groups.filter(group => group.is_registration_group));
			}).catch(reject);
		});
	}
	
	getPrivateInfo() {
		var _this = this;
		
		return new Promise(function (resolve, reject) {
			_this.client.make("GET", "/api/school_private_infos/" + _this.id).then(function (response) {
				resolve(new SchoolPrivateInfo(_this.client, response.school_private_info));
			}).catch(function(err) {
				reject(err);
			});
		});
	}
}

module.exports = SchoolIncomplete;