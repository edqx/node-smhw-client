const Submission = require("./Submission.js");
const QuizSubmissionQuestion = require("./QuizSubmissionQuestion.js");
const SubmissionComment = require("./SubmissionComment.js");

class QuizSubmission extends Submission {
	constructor(client, response) {
		super(client, response);
		
		this.quiz_id = response.quiz_id;
		this.question_ids = response.question_ids;
	}
	
	getSubmissionQuestions(...ids) {
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
			_this.client.make("GET", "/api/quiz_submission_questions?" + questions, {
				referer: "/quizzes/" + _this.quiz_id
			})
			.then(function (response) {
				resolve(response.quiz_submission_questions.map(_ => new QuizSubmissionQuestion(_this.client, _)));
			}).catch(function(err) {
				reject(err);
			});
		});
	}
	
	postComment(content) {
		var _this = this;
		
		return new Promise(function (resolve, reject) {
			_this.client.make("POST", "/api/submission_comments/", {
				payload: {
					submission_comment: {
						text: content,
						created_at: null,
						updated_at: null,
						user_name: null,
						user_id: null,
						submission_id: _this.id,
						submission_type: "QuizSubmission"
					}
				},
				referer: "/todos/issued"
			})
			.then(function (response) {
				resolve(new SubmissionComment(_this.client, response.submission_comment));
			}).catch(function(err) {
				reject(err);
			});
		});
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
			_this.client.make("GET", "/api/quiz_submissions/" + _this.id, {
				referer: "/todos/issued"
			})
			.then(function (response) {
				resolve(response.submission_comments.filter(_ => comments.indexOf(_.id) !== -1).map(_ => new SubmissionComment(_this.client, _)));
			}).catch(function(err) {
				reject(err);
			});
		});
	}
}

module.exports = QuizSubmission;