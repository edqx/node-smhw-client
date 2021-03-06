const Assignment = require("./Assignment.js");
const QuizSubmission = require("./QuizSubmission.js");
const QuizQuestion = require("./QuizQuestion.js");
const ClassGroup = require("./ClassGroup.js");

class Quiz extends Assignment {
	constructor(client, response) {
		super(client, response);
		
		this.random_order = response.random_order;
		this.time_limit = response.questions_time_limit;
		this.completed = response.completed;
		this.answered_by_students = response.answered_by_students;
		this.question_ids = response.question_ids;
	}
	
	getOwnSubmission() {
		var _this = this;
		
		return new Promise(function (resolve, reject) {
			_this.client.make("GET", "/api/quiz_submissions/" + _this.id + "-" + _this.client.student.id)
			.then(function (response) {
				resolve(new QuizSubmission(_this.client, response.quiz_submission));
			}).catch(function(err) {
				reject(err);
			});
		});
	}
	
	getSubmissions(...ids) {
		var _this = this;
		
		if (Array.isArray(ids[0])) {
			ids = ids[0];
		}
		
		var submissions;
		if (ids.length) {
			submissions = ids.map(sid => "ids%5B%5D=" + sid).join("&");
		} else {
			submissions = _this.submission_ids.map(sid => "ids%5B%5D=" + sid).join("&");
		}
		
		return new Promise(function (resolve, reject) {
			_this.client.make("GET", "/api/quiz_submissions?" + submissions, {
				referer: "/todos/issued"
			})
			.then(function (response) {
				resolve(response.quiz_submissions.map(_ => new QuizSubmission(_this.client, _)));
			}).catch(function(err) {
				reject(err);
			});
		});
	}
	
	getQuestions(...ids) {
		var _this = this;
		
		if (Array.isArray(ids[0])) {
			ids = ids[0];
		}
		
		var questions;
		if (ids.length) {
			questions = ids.map(qid => "ids%5B%5D=" + qid).join("&");
		} else {
			questions = _this.question_ids.map(qid => "ids%5B%5D=" + qid).join("&");
		}
		
		return new Promise(function (resolve, reject) {
			_this.client.make("GET", "/api/quiz_questions?" + questions)
			.then(function (response) {
				resolve(response.quiz_questions.map(_ => new QuizQuestion(_this.client, _)));
			}).catch(function(err) {
				reject(err);
			});
		});
	}
}

module.exports = Quiz;