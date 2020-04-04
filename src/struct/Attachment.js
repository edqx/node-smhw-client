const fs = require("fs");

class Attachment {
	constructor(client, response) {
		this.client = client;
		
		this.id = response.id;
		this.content_type = response.content_type;
		this.filename = response.filename;
		this.file_size = response.file_size;
		this.user_id = response.user_id;
		this.file_url = response.file_url;
		this.preview_url = response.preview_url;
		this.third_party_provider = response.third_party_provider;
		this.third_party_shared_link = response.third_party_shared_link;
		this.created_timestamp = new Date(response.created_at).getTime();
		this.updated_timestamp = new Date(response.updated_at).getTime();
		this.is_previewable = response.is_previewable;
		this.for_logged_in_only = response.for_logged_in_only;
	}
	
	download(path) {
		var writestream = fs.createWriteStream(path);
		
		var _this = this;
		
		return new Promise(function (resolve, reject) {
			const request_options = {};
		
			https.get(_this.file_url, function (res) {
				res.pipe(writestream);
			});
		});
	}
}

module.exports = Attachment;