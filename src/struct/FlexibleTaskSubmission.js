const Submission = require("./Submission.js");
const SubmissionComment = require("./SubmissionComment.js");

class FlexibleTaskSubmission extends Submission {
	constructor(client, response) {
		super(client, response);
		
		this.flexible_task_id = response.homework_id;
		this.grading_comment = response.grading_comment;
		this.completed = response.completed;
		this.overdue = response.overdue;
		this.marked = response.marked;
		this.handed_in_timestamp = new Date(response.handed_in_on).getTime();
		this.has_unread_comments = response.has_unread_comments;
		this.version_ids = response.version_ids;
		this.current_submission_version_id = response.current_submission_version_id;
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
						submission_type: "FlexibleTaskSubmission"
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

	getComments(...ids) {
		var _this = this;
		
		if (Array.isArray(ids[0])) {
			ids = ids[0];
		}
		
		var comments;
		if (ids.length) {
			comments = ids.map(cid => "ids%5B%5D=" + cid).join("&");
		} else {
			comments = _this.comment_ids.map(cid => "ids%5B%5D=" + cid).join("&");
		}
		
		return new Promise(function (resolve, reject) {
			_this.client.make("GET", "/api/flexible_task_submissions/" + _this.id, {
				referer: "/todos/issued"
			})
			.then(function (response) {
				resolve(response.submission_comments.filter(_ => comments.indexOf(_.id) !== -1).map(_ => new SubmissionComment(_this.client, _)));
			}).catch(function(err) {
				reject(err);
			});
		});
	}
}

module.exports = FlexibleTaskSubmission;