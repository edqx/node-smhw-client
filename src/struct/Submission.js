const SubmissionComment = require("./SubmissionComment.js");

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
}

module.exports = Submission;