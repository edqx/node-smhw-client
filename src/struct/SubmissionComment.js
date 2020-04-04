class SubmissionComment {
	constructor(client, response) {
		this.client = client;
		
		this.id = response.id;
		this.user_id = response.user_id;
		this.assignment_id = response.assignment_id;
		this.assignment = response.assignment;
		this.submission = response.submission;
		this.text = response.text;
		this.created_timestamp = new Date(response.created_at).getTime();
		this.updated_timestamp = new Date(response.updated_at).getTime();
		this.origin = response.origin;
		this.user_name = response.user_name;
	}
	
	getAssignment() {
		if (this.assignment.type === "homework") {
			return this.client.getHomework(this.assignment.id);
		} else if (this.assignment.type === "quiz") {
			return this.client.getQuiz(this.quiz.id);
		}
	}
	
	getSubmission() {
		if (this.assignment.type === "homework_submission") {
			return this.client.getHomeworkSubmission(this.assignment.id);
		} else if (this.assignment.type === "quiz_submission") {
			return this.client.getQuizSubmission(this.quiz.id);
		}
	}
}

module.exports = SubmissionComment;