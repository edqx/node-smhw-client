const Attachment = require("./Attachment.js");

class HomeworkSubmissionVersion {
    constructor(client, response) {
        this.client = client;

        this.attachment_ids = response.attachment_ids;
        this.complete_online_text = response.complete_online_text;
        this.created_timestamp = new Date(response.created_at).getTime();
        this.id = response.id;
        this.updated_timestamp = new Date(response.updated_at).getTime();
        this.user_attachment_ids = response.user_attachment_ids;
        this.user_id = response.user_id;
        this.user_name = response.user_name;
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
                console.log(response, "/api/attachments?" + attachments);

				resolve(response.attachments.map(_ => new Attachment(_this.client, _)));
			}).catch(function(err) {
				reject(err);
			});
		});
    }
}

module.exports = HomeworkSubmissionVersion;