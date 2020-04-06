const Assignment = require("./Assignment.js");
const Attachment = require("./Attachment.js");
const HomeworkSubmission = require("./HomeworkSubmission.js");

class Homework extends Assignment {
	constructor(client, response) {
		super(client, response);
		
		this.marking_scheme_id = response.marking_scheme_id;
		this.duration = response.duration;
		this.duration_units = response.duration_units;
		this.submission_type = response.submission_type;
		this.bookstore_content_ids = response.bookstore_content_ids;
	}
	
	getOwnSubmission() {
		var _this = this;
		
		return new Promise(function (resolve, reject) {
			_this.client.make("GET", "/api/homework_submissions/" + _this.id + "-" + _this.client.student.id)
			.then(function (response) {
				resolve(new HomeworkSubmission(_this.client, response.homework_submission));
			}).catch(function(err) {
				reject(err);
			});
		});
	}
	
	getSubmissions(...ids) {
		var _this = this;
		
		if (Array.isArray(ids[0])) {
			ids = ids[0];
		}
		
		var submissions;
		if (ids.length) {
			submissions = ids.map(sid => "ids%5B%5D=" + sid).join("&");
		} else {
			submissions = _this.submission_ids.map(sid => "ids%5B%5D=" + sid).join("&");
		}
		
		return new Promise(function (resolve, reject) {
			_this.client.make("GET", "/api/homework_submissions?" + submissions, {
				referer: "/todos/issued"
			})
			.then(function (response) {
				resolve(response.homework_submissions.map(_ => new HomeworkSubmission(_this.client, _)));
			}).catch(function(err) {
				reject(err);
			});
		});
	}
}

module.exports = Homework;