const https = require("https");
const querystring = require("querystring");
const FormData = require("form-data");
const fs = require("fs");
const EventEmitter = require("events");

const request = require("../request.js");

const SchoolIncomplete = require("./SchoolIncomplete.js");
const SchoolPrivateInfo = require("./SchoolPrivateInfo.js");
const UserPrivateInfo = require("./UserPrivateInfo.js");
const SubmissionMethod = require("./SubmissionMethod.js");
const Access = require("./Access.js");
const Student = require("./Student.js");
const School = require("./School.js");

const Task = require("./Task.js");
const Homework = require("./Homework.js");
const Quiz = require("./Quiz.js");
const FlexibleTask = require("./FlexibleTask.js");
const SpellingTest = require("./SpellingTest.js");
const HomeworkSubmission = require("./HomeworkSubmission.js");
const QuizSubmission = require("./QuizSubmission.js");
const FlexibleTaskSubmission = require("./FlexibleTaskSubmission.js");
const SpellingTestSubmission = require("./SpellingTestSubmission.js");

const API_BASE_URL = "api.showmyhomework.co.uk";
const SATCHELONE = "https://www.satchelone.com"

const CLIENTID_WEB = "55283c8c45d97ffd88eb9f87e13f390675c75d22b4f2085f43b0d7355c1f";
const CLIENTSECRET_WEB = "c8f7d8fcd0746adc50278bc89ed6f004402acbbf4335d3cb12d6ac6497d3";

function pad_left(v, a) {
	v = v.toString();
	
	return "0".repeat(a - v.length) + v;
}

class Client {
	constructor(options) {
		this.options = options;
		
		this.access = new Access(this, {});
		this.student = null;
		this.user = null;
		
		this.heartbeat = null;
		this.last_heartbeat = null;
	}
	
	make(method, path, options = {}) {
		if (!options.headers) {
			options.headers = {};
		}
		
		options.headers.authorization = "Bearer " + (this.access.access_token || null);
		
		return request.make(method, path, options);
	}
	
	makeHeartbeat() {
		var _this = this;
		
		return new Promise(function (resolve, reject) {
			_this.make("GET", "/api/heartbeat", {
				referer: "/calendar/personal"
			}).then(function (response) {
				_this.last_heartbeat = response.time;
			}).catch(function(err) {
				reject(err);
			});
		});
	}
	
	stopHeartbeat() {
		if (this.heartbeat) {
			clearInterval(this.heartbeat);
		}
	}
	
	login(school_id, username, password) {
		var _this = this;

		if (typeof school_id === "object") {
			return new Promise(function (resolve, reject) {
				_this.access = new Access(school_id);

				_this.make("GET", "/api/students/" + _this.access.user_id, {
					query: {
						include: "user_private_info,school",
					}
				}).then(function (response) {
					_this.student = new Student(_this, response.student, new School(_this, response.schools[0]));
					_this.user = new UserPrivateInfo(_this, response.user_private_infos[0]);
					
					resolve(true);
					
					if (_this.options.keep_heartbeat) {
						_this.heartbeat = setInterval(function () {
							_this.makeHeartbeat();
						}, 15000);
					}
				}).catch(function (err) {
					reject(err);
				});
			});

			return;
		}
		
		return new Promise(function (resolve, reject) {
			_this.make("POST", "/oauth/token", {
				body: {
					grant_type: "password",
					username: username,
					password: password,
					school_id: school_id
				},
				query: {
					client_id: CLIENTID_WEB,
					client_secret: CLIENTSECRET_WEB
				},
				headers: {
					"accept": "*/*",
				},
				referrer: "/login"
			}).then(function (response) {
				if (response.errors) {
					reject({
						code: "INVCRED"
					});
					return;
				}

				_this.access = new Access(response);
				
				_this.make("GET", "/api/students/" + _this.access.user_id, {
					query: {
						include: "user_private_info,school",
					}
				}).then(function (response) {
					_this.student = new Student(_this, response.student, new School(_this, response.schools[0]));
					_this.user = new UserPrivateInfo(_this, response.user_private_infos[0]);
					
					resolve(true);
					
					if (_this.options.keep_heartbeat) {
						_this.heartbeat = setInterval(function () {
							_this.makeHeartbeat();
						}, 15000);
					}
				}).catch(function (err) {
					reject(err);
				});
			}).catch(function(err) {
				reject(err);
			});
		});
	}
	
	getTodo() {
		var _this = this;
		
		return new Promise(function (resolve, reject) {
			_this.make("GET", "/api/todos/", {
				referer: "/todos/issued"
			}).then(function (response) {
				resolve(response.todos.map(_ => new Task(_this, _)));
			}).catch(function(err) {
				reject(err);
			});
		});
	}
	
	getHomework(id) {
		var _this = this;
		
		return new Promise(function (resolve, reject) {
			_this.make("GET", "/api/homeworks/" + id, {
				referer: "/todos/issused"
			}).then(function (response) {
				resolve(new Homework(_this, response.homework));
			}).catch(function(err) {
				reject(err);
			});
		});
	}
	
	getQuiz(id) {
		var _this = this;
		
		return new Promise(function (resolve, reject) {
			_this.make("GET", "/api/quizzes/" + id, {
				referer: "/todos/issused"
			}).then(function (response) {
				resolve(new Quiz(_this, response.quiz));
			}).catch(function(err) {
				reject(err);
			});
		});
	}
	
	getFlexibleTask(id) {
		var _this = this;
		
		return new Promise(function (resolve, reject) {
			_this.make("GET", "/api/flexible_tasks/" + id, {
				referer: "/todos/issused"
			}).then(function (response) {
				resolve(new FlexibleTask(_this, response.flexible_task));
			}).catch(function(err) {
				reject(err);
			});
		});
	}

	getSpellingTest(id) {
		var _this = this;
		
		return new Promise(function (resolve, reject) {
			_this.make("GET", "/api/spelling_tests/" + id, {
				referer: "/todos/issused"
			}).then(function (response) {
				resolve(new SpellingTest(_this, response.spelling_test));
			}).catch(function(err) {
				reject(err);
			});
		});
	}
	
	getHomeworkSubmission(id) {
		var _this = this;
		
		return new Promise(function (resolve, reject) {
			_this.make("GET", "/api/homework_submissions/" + id, {
				referer: "/todos/issused"
			}).then(function (response) {
				resolve(new HomeworkSubmission(_this, response.homework_submission));
			}).catch(function(err) {
				reject(err);
			});
		});
	}
		
	getQuizSubmission(id) {
		var _this = this;
		
		return new Promise(function (resolve, reject) {
			_this.make("GET", "/api/quiz_submissions/" + id, {
				referer: "/todos/issused"
			}).then(function (response) {
				resolve(new QuizSubmission(_this, response.quiz_submission));
			}).catch(function(err) {
				reject(err);
			});
		});
	}
	
	getFlexibleTaskSubmission(id) {
		var _this = this;
		
		return new Promise(function (resolve, reject) {
			_this.make("GET", "/api/flexible_task_submissions/" + id, {
				referer: "/todos/issused"
			}).then(function (response) {
				resolve(new FlexibleTaskSubmission(_this, response.flexible_task_submission));
			}).catch(function(err) {
				reject(err);
			});
		});
	}
	
	getSpellingTestSubmission(id) {
		var _this = this;
		
		return new Promise(function (resolve, reject) {
			_this.make("GET", "/api/spelling_test_submissions/" + id, {
				referer: "/todos/issused"
			}).then(function (response) {
				resolve(new SpellingTestSubmission(_this, response.spelling_test_submission));
			}).catch(function(err) {
				reject(err);
			});
		});
	}
	
	getTeacher(id) {
		var _this = this;
		
		return new Promise(function (resolve, reject) {
			_this.client.make("GET", "/api/public/teachers/" + id)
			.then(function (response) {
				resolve(new Teacher(_this.client, response.teacher));
			}).catch(function(err) {
				reject(err);
			});
		});
	}
	
	getSubmissionMethods() {
		var _this = this;
		
		return new Promise(function (resolve, reject) {
			_this.make("GET", "/api/submission_methods")
			.then(function (response) {
				resolve(response.submission_methods.map(_ => new SubmissionMethod(_this, _)));
			}).catch(function(err) {
				reject(err);
			});
		});
	}
	
	searchSchools(term, limit) {
		var _this = this;
		
		return new Promise(function (resolve, reject) {
			_this.make("GET", "/api/public/school_search", {
				query: {
					filter: term,
					limit: limit || 20
				}
			}).then(function (response) { // Response returns an array of incomplete school objects.
				resolve(response.schools.map(_ => new SchoolIncomplete(_this, _)));
			}).catch(function(err) {
				reject(err);
			});
		});
	}
}

module.exports = Client;