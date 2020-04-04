const Attachment = require("./Attachment.js");
const FlexibleTaskSubmission = require("./FlexibleTaskSubmission.js");

class FlexibleTask {
	constructor(client, response) {
		this.client = client;
		
		this.id = response.id;
		this.teacher_id = response.teacher_id;
		this.title = response.title;
		this.subject = response.subject;
		this.due_timestamp = new Date(response.due_on).getTime();
		this.issued_on = new Date(response.issued_on).getTime();
		this.class_group_id = response.class_group_id;
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
		this.marking_scheme_id = response.marking_scheme_id;
		this.duration = response.duration;
		this.duration_units = response.duration_units;
		this.submission_type = response.submission_type;
		this.attachment_ids = response.attachment_ids;
		this.web_links = response.web_links;
		this.community_resource_item_id = response.community_resource_item_id;
		this.bookstore_content_ids = response.bookstore_content_ids;
	}
	
	getOwnSubmission() {
		var _this = this;
		
		return new Promise(function (resolve, reject) {
			_this.client.make("GET", "/api/flexible_task_submissions/" + _this.id + "-" + _this.client.student.id)
			.then(function (response) {
				resolve(new FlexibleTaskSubmission(_this.client, response.flexible_task_submission));
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
			_this.client.make("GET", "/api/flexible_task_submissions?" + submissions, {
				referer: "/todos/issued"
			})
			.then(function (response) {
				resolve(response.flexible_task_submissions.map(_ => new FlexibleTaskSubmission(_this.client, _)));
			}).catch(function(err) {
				reject(err);
			});
		});
	}
}

module.exports = FlexibleTask;