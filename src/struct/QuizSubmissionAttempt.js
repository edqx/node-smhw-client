class QuizSubmissionAttempt {
	constructor(response) {
		this.start = response.start;
		this.answer = response.answer;
		this.correct = response.correct;
	}
}

module.exports = QuizSubmissionAttempt;