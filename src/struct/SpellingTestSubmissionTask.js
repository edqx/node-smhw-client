const SpellingTestSubmissionAttempt = require("./SpellingTestSubmissionAttempt.js");

class SpellingTestSubmissionTask {
	constructor(client, response) {
		this.client = client;
		
		this.id = response.id;
		this.spelling_test_tray_task_id = response.spelling_test_tray_task_id;
		this.attempt1 = new SpellingTestSubmissionAttempt(response.attempt1);
		this.attempt2 = new SpellingTestSubmissionAttempt(response.attempt2);
		this.attempt3 = new SpellingTestSubmissionAttempt(response.attempt3);
	}
	
	submitAnswer(attempt, answer) {
		// need to look into this.
	}
}

module.exports = SpellingTestSubmissionTask;