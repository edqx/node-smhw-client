const QuizSubmissionAttempt = require("./QuizSubmissionAttempt.js");

class QuizSubmissionQuestion {
	constructor(client, response) {
		this.client = client;
		
		this.id = response.id;
		this.quiz_question_id = response.quiz_question_id;
		this.description = response.description;
		this.options = response.options;
		this.image = response.image;
		this.correct_answer = response.correct_answer;
		this.attempt1 = response.attempt1 ? new QuizSubmissionAttempt(response.attempt1) : null;
		this.attempt2 = response.attempt2 ? new QuizSubmissionAttempt(response.attempt2) : null;
		this.attempt3 = response.attempt3 ? new QuizSubmissionAttempt(response.attempt3) : null;
	}
	
	setStarted(attempt, date = new Date()) {
		var _this = this;
		
		if (_this["attempt" + attempt]) {
			return new Promise(function (resolve, reject) {
				reject("Attempt " + attempt + " already started.");
			});
		}
		
		var copy = new QuizSubmissionQuestion(_this.client, _this);
		
		copy["attempt" + attempt] = new QuizSubmissionAttempt({
			start: date.toISOString(),
			answer: null,
			correct: false
		});
		
		return new Promise(function (resolve, reject) {
			_this.client.make("PUT", "/api/quiz_submission_questions/" + _this.id, {
				payload: {
					quiz_submission_question: {
						image: copy.image,
						options: copy.ooptions,
						updated_at: copy.updated_at,
						description: copy.description,
						attempt1: copy.attempt1,
						attempt2: copy.attempt2,
						attempt3: copy.attempt3,
						quiz_question_id: copy.quiz_question_id
					}
				}
			})
			.then(function (response) {
				resolve(new QuizSubmissionQuestion(_this.client, response.quiz_submission_question));
			}).catch(function(err) {
				reject(err);
			});
		});
	}
	
	submitAnswer(attempt, answer) {
		var _this = this;
		
		if (_this["attempt" + attempt] && _this["attempt" + attempt].answer) {
			return new Promise(function (resolve, reject) {
				reject("Attempt " + attempt + " answer already submitted.");
			});
		}
		
		if (typeof answer === "number") {
			answer = _this.options[answer];
		}
		
		var copy = new QuizSubmissionQuestion(_this.client, _this);
		
		copy["attempt" + attempt] = new QuizSubmissionAttempt({
			start: copy["attempt" + attempt].start,
			answer: answer,
			correct: false
		});
		
		return new Promise(function (resolve, reject) {
			_this.client.make("PUT", "/api/quiz_submission_questions/" + _this.id, {
				payload: {
					quiz_submission_question: {
						image: copy.image,
						options: copy.ooptions,
						updated_at: copy.updated_at,
						description: copy.description,
						attempt1: copy.attempt1,
						attempt2: copy.attempt2,
						attempt3: copy.attempt3,
						quiz_question_id: copy.quiz_question_id
					}
				}
			})
			.then(function (response) {
				resolve(new QuizSubmissionQuestion(_this.client, response.quiz_submission_question));
			}).catch(function(err) {
				reject(err);
			});
		});
	}
}

module.exports = QuizSubmissionQuestion;