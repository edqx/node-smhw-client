const Attachment = require("./Attachment.js");

class Assignment {
	constructor(client, response) {
		this.client = client;
		
		this.id = response.id;
		this.teacher_id = response.teacher_id;
		this.teacher_name = response.teacher_name;
		this.title = response.title;
		this.subject = response.subject;
		this.due_timestamp = new Date(response.due_on).getTime();
		this.issued_timestamp = new Date(response.issued_on).getTime();
		this.created_timestamp = new Date(response.created_at).getTime();
		this.updated_timestamp = new Date(response.updated_at).getTime();
		this.published_timestamp = new Date(response.published_at).getTime();
		this.class_group_id = response.class_group_id;
		this.class_group_name = response.class_group_name;
		this.purpose = response.purpose;
		this.year = response.year;
		this.submission_status = response.submission_status;
		this.submission_ids = response.submission_ids;
		this.has_unread_comments = response.has_unread_comments;
		this.school_id = response.school_id;
		this.school_name = response.school_name;
		this.school_logo_url = response.school_logo_url;
		this.description = response.description;
		this.submission_method_id = response.submission_method_id;
		this.web_links = response.web_links;
		this.community_resource_item_id = response.community_resource_item_id;
		this.attachment_ids = response.attachment_ids;
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
}

module.exports = Assignment;