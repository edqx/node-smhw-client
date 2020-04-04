const QuizSubmission = require("./QuizSubmission.js");
const QuizQuestion = require("./QuizQuestion.js");
const ClassGroup = require("./ClassGroup.js");

class Quiz {
	constructor(client, response) {
		this.client = client;
		
		this.id = response.id;
		this.teacher_id = response.teacher_id;
		this.title = response.title;
		this.subject = response.subject;
		this.due_on = new Date(response.due_on).getTime();
		this.class_group_id = response.class_group_id;
		this.issued_on = new Date(response.issued_on).getTime();
		this.published_at = new Date(response.published_at).getTime();
		this.created_timestamp = new Date(response.created_at).getTime();
		this.updated_timestamp = new Date(response.updated_at).getTime();
		this.purpose = response.purpose;
		this.year = response.class_year;
		this.class_group_name = response.class_group_name;
		this.submission_status = response.submission_status;
		this.teacher_name = response.teacher_name;
		this.submission_ids = response.submission_ids;
		this.has_unread_comments = response.has_unread_comments;
		this.school_id = response.school_id;
		this.school_name = response.school_name;
		this.school_logo_url = response.school_logo_url;
		this.description = response.description;
		this.submission_method_id = response.submission_method_id;
		this.random_order = response.random_order;
		this.time_limit = response.questions_time_limit;
		this.completed = response.completed;
		this.answered_by_students = response.answered_by_students;
		this.attachment_ids = response.attachment_ids;
		this.web_links = response.web_links;
		this.community_resource_item_id = response.community_resource_item_id;
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
	
	getClassGroup() {
		var _this = this;
		
		return new Promise(function (resolve, reject) {
			_this.client.make("GET", "/api/class_groups/" + _this.class_group_id)
			.then(function (response) {
				resolve(new ClassGroup(_this.client, response.class_group));
			}).catch(function(err) {
				reject(err);
			});
		});
	}
	
	getAttachments(...ids) {
		var _this = this;
		
		if (Array.isArray(ids[0])) {
			ids = ids[0];
		}
		
		var attachments;
		if (ids.length) {
			attachments = ids.map(aid => "ids%5B%5D=" + aid).join("&");
		} else {
			attachments = _this.attachment_ids.map(aid => "ids%5B%5D=" + aid).join("&");
		}
		
		return new Promise(function (resolve, reject) {
			_this.client.make("GET", "/api/attachments?" + attachments, {
				referer: "/todos/issued"
			})
			.then(function (response) {
				resolve(response.attachments.map(_ => new Attachment(_this.client, _)));
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
}

module.exports = Quiz;