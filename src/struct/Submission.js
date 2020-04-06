class Submission {
	constructor(client, response) {
		this.client = client;
		
		this.id = response.id;
		this.status = response.status;
		this.student_id = response.student_id;
		this.student_name = response.student_name;
		this.student_avatar = response.student_avatar;
		this.created_timestamp = new Date(response.created_at).getTime();
		this.updated_timestamp = new Date(response.updated_at).getTime();
		this.grade = response.grade;
		this.event_ids = response.event_ids;
		this.comment_ids = response.comment_ids;
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
			_this.client.make("GET", "/api/submission_comments?" + comments, {
				referer: "/todos/issued"
			})
			.then(function (response) {
				resolve(response.submission_comments.map(_ => new SubmissionComment(_this.client, _)));
			}).catch(function(err) {
				reject(err);
			});
		});
	}
}

module.exports = Submission;