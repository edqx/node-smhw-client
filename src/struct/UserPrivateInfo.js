class UserPrivateInfo {
	constructor(client, response) {
		this.client = client;
		
		this.id = response.id;
		this.bio = response.bio;
		this.email = response.email;
		this.last_activity_at = new Date(response.last_activity_at).getTime();
		this.last_subject = response.last_subject;
		this.username = response.username;
		this.confirmed_at = new Date(response.confirmed_at).getTime();
		this.mobile_device_id = response.mobile_device_id;
		this.calendar_token = response.calendar_token;
		this.total_storage_used = response.total_storage_used;
		this.root_folder_id = response.root_folder_id;
		this.uid = response.uid;
		this.has_filled_details = response.has_filled_details;
		this.intercom_enabled = response.intercom_enabled;
		this.confirmed_publication_warning = response.confirmed_publication_warning;
		this.last_user_activity_at = new Date(response.last_user_activity_at).getTime();
		this.notification_preference_id = response.notification_preference_id;
	}
}

module.exports = UserPrivateInfo;