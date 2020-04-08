class SubmissionComment {
	constructor(client, response) {
		this.client = client;
		
		this.id = response.id;
		this.user_id = response.user_id;
		this.user_name = response.user_name;
		this.assignment_id = response.assignment_id;
		this.assignment = response.assignment;
		this.submission = response.submission;
		this.text = response.text;
		this.created_timestamp = new Date(response.created_at).getTime();
		this.updated_timestamp = new Date(response.updated_at).getTime();
		this.origin = response.origin;
	}
	
	getAssignment() {
		if (this.assignment.type === "homework") {
			return this.client.getHomework(this.assignment.id);
		} else if (this.assignment.type === "quiz") {
			return this.client.getQuiz(this.assignment.id);
		} else if (this.assignment.type === "flexible_task") {
			return this.client.getFlexibleTask(this.assignment.id);
		} else if (this.assignment.type === "spelling_test") {
			return this.client.getSpellingTest(this.assignment.id);
		}
	}
	
	getSubmission() {
		if (this.assignment.type === "homework_submission") {
			return this.client.getHomeworkSubmission(this.submission.id);
		} else if (this.assignment.type === "quiz_submission") {
			return this.client.getQuizSubmission(this.submission.id);
		} else if (this.assignment.type === "flexible_task_submission") {
			return this.client.getFlexibleTaskSubmission(this.submission.id);
		} else if (this.assignment.type === "spelling_test_submission") {
			return this.client.getSpellingTestSubmission(this.submission.id);
		}
	}
}

module.exports = SubmissionComment;