class SpellingTestSubmissionAttempt {
	constructor(response) {
		this.text = response.text;
		this.correct = response.correct;
	}
}

module.exports = SpellingTestSubmissionAttempt;