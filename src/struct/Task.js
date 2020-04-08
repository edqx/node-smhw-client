class Task {
	constructor(client, response) {
		this.client = client;
		
		this.id = response.id;
		this.title = response.class_task_title;
		this.description = response.class_task_description;
		this.type = response.class_task_type;
		this.class_name = response.class_group_name;
		this.class_task_id = response.class_task_id;
		this.completed = response.completed;
		this.due_timestamp = new Date(response.due_on).getTime();
		this.issued_timestamp = new Date(response.issued_on).getTime();
		this.subject = response.subject;
		this.teacher_name = response.teacher_name;
		this.user_id = response.user_id;
		this.has_attachments = response.has_attachments;
		this.status = response.submission_status;
		this.submission_type = response.submission_type;
	}
	
	setCompleted() {
		var _this = this;
		
		return new Promise(function (resolve, reject) {
			_this.client.make("PUT", "/api/todos/" + _this.class_task_id, {
				payload: {
					todo: {
						completed: true,
						submission_status: _this.status,
						subject: _this.subject,
						due_on: new Date(_this.due_timestamp).toISOString(),
						issued_on: new Date(_this.issued_timestamp).toISOString(),
						teacher_name: _this.teacher_name,
						class_task_id: _this.class_task_id,
						class_task_title: _this.title,
						class_task_description: _this.description,
						class_task_type: _this.type,
						class_group_name: _this.class_name
					}
				}
			})
			.then(function (response) {
				_this.completed = true;
				resolve(_this);
			}).catch(function(err) {
				reject(err);
			});
		});
	}
	
	setUncompleted() {
		var _this = this;
		
		return new Promise(function (resolve, reject) {
			_this.client.make("PUT", "/api/todos/" + _this.class_task_id, {
				payload: {
					todo: {
						completed: false,
						submission_status: _this.status,
						subject: _this.subject,
						due_on: new Date(_this.due_timestamp).toISOString(),
						issued_on: new Date(_this.issued_timestamp).toISOString(),
						teacher_name: _this.teacher_name,
						class_task_id: _this.class_task_id,
						class_task_title: _this.title,
						class_task_description: _this.description,
						class_task_type: _this.type,
						class_group_name: _this.class_name
					}
				}
			})
			.then(function (response) {
				_this.completed = false;
				resolve(_this);
			}).catch(function(err) {
				reject(err);
			});
		});
	}
	
	getAssignment() {
		if (this.type === "Homework") {
			return this.client.getHomework(this.id);
		} else if (this.type === "Quiz") {
			return this.client.getQuiz(this.id);
		} else if (this.type === "FlexibleTask") {
			return this.client.getFlexibleTask(this.id);
		} else if (this.type === "SpellingTest") {
			return this.client.getSpellingTest(this.id);
		}
	}
}

module.exports = Task;