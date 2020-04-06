const Assignment = require("./Assignment.js");
const Attachment = require("./Attachment.js");
const SpellingTestSubmission = require("./SpellingTestSubmission.js");
const SpellingTestTray = require("./SpellingTestTray.js");

class SpellingTest extends Assignment {
	constructor(client, response) {
		super(client, response);
		
		this.time_limit = response.time_limit;
		this.language = response.language;
		this.voice_key = response.voice_key;
		this.random_order = response.random_order;
		this.tray_ids = response.tray_ids;
	}
	
	getOwnSubmission() {
		var _this = this;
		
		return new Promise(function (resolve, reject) {
			_this.client.make("GET", "/api/spelling_test_submissions/" + _this.id + "-" + _this.client.student.id)
			.then(function (response) {
				resolve(new SpellingTestSubmission(_this.client, response.spelling_test_submission));
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
			_this.client.make("GET", "/api/spelling_test_submissions?" + submissions, {
				referer: "/todos/issued"
			})
			.then(function (response) {
				resolve(response.spelling_test_submissions.map(_ => new SpellingTestSubmission(_this.client, _)));
			}).catch(function(err) {
				reject(err);
			});
		});
	}
	
	getTrays(...ids) {
		var _this = this;
		
		if (Array.isArray(ids[0])) {
			ids = ids[0];
		}
		
		var trays;
		if (ids.length) {
			trays = ids.map(tid => "ids%5B%5D=" + tid).join("&");
		} else {
			trays = _this.tray_ids.map(tid => "ids%5B%5D=" + tid).join("&");
		}
		
		return new Promise(function (resolve, reject) {
			_this.client.make("GET", "/api/spelling_test_trays?" + trays)
			.then(function (response) {
				resolve(response.spelling_test_trays.map(_ => new SpellingTestTray(_this.client, _)));
			}).catch(function(err) {
				reject(err);
			});
		});
	}
}

module.exports = SpellingTest;