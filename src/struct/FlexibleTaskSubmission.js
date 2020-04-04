const BaseSubmission = require("./BaseSubmission.js");

const SubmissionComment = require("./SubmissionComment.js");

class FlexibleTaskSubmission extends BaseSubmission {
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
	
	getComments(...ids) {
		var _this = this;
		
		if (Array.isArray(ids[0])) {
			ids = ids[0];
		}
		
		return new Promise(function (resolve, reject) {
			_this.client.make("GET", "/api/flexible_task_submissions/" + _this.flexible_task_id + "-" + _this.student_id, {
				referer: "/todos/issued"
			})
			.then(function (response) {
				var comments = response.submission_comments.map(_ => new SubmissionComment(_this.client, _));
				
				if (ids.length) {
					resolve(comments.filter(_ => ids.indexOf(_.id) > -1));
				} else {
					resolve(comments);
				}
			}).catch(function(err) {
				reject(err);
			});
		});
	}
	
	postComment(content) {
		var _this = this;
		
		return new Promise(function (resolve, reject) {
			_this.client.make("POST", "/api/submission_comments/" + _this.flexible_task_id + "-" + _this.student_id, {
				payload: {
					text: content,
					created_at: null,
					updated_at: null,
					user_name: null,
					user_id: null,
					submission_id: _this.flexible_task_id,
					submission_type: "FlexibleTaskSubmission"
				},
				referer: "/todos/issued"
			})
			.then(function (response) {
				resolve(new SubmissionComment(response.submission_comment));
			}).catch(function(err) {
				reject(err);
			});
		});
	}
}

module.exports = FlexibleTaskSubmission;