const Submission = require("./Submission.js");
const SubmissionComment = require("./SubmissionComment.js");
const SpellingTestSubmissionTask = require("./SpellingTestSubmissionTask.js");

class SpellingTestSubmission extends Submission {
	constructor(client, response) {
		super(client, response);
		
		this.task_ids = response.task_ids;
		this.spelling_test_id = response.spelling_test_id;
	}
	
	getSubmissionTasks(...ids) {
		var _this = this;
		
		if (Array.isArray(ids[0])) {
			ids = ids[0];
		}
		
		var tasks;
		if (ids.length) {
			tasks = ids.map(tid => "ids%5B%5D=" + tid).join("&");
		} else {
			tasks = _this.task_ids.map(tid => "ids%5B%5D=" + tid).join("&");
		}
		
		return new Promise(function (resolve, reject) {
			_this.client.make("GET", "/api/spelling_test_submission_tasks?" + questions, {
				referer: "/spelling-tests/" + _this.spelling_test_id
			})
			.then(function (response) {
				resolve(response.spelling_test_submission_tasks.map(_ => new SpellingTestSubmissionTask(_this.client, _)));
			}).catch(function(err) {
				reject(err);
			});
		});
	}
	
	postComment(content) {
		var _this = this;
		
		return new Promise(function (resolve, reject) {
			_this.client.make("POST", "/api/submission_comments/", {
				payload: {
					submission_comment: {
						text: content,
						created_at: null,
						updated_at: null,
						user_name: null,
						user_id: null,
						submission_id: _this.id,
						submission_type: "SpellingTestSubmission"
					}
				},
				referer: "/todos/issued"
			})
			.then(function (response) {
				resolve(new SubmissionComment(_this.client, response.submission_comment));
			}).catch(function(err) {
				reject(err);
			});
		});
	}
}

module.exports = SpellingTestSubmission;