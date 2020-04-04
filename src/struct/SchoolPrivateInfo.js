class SchoolPrivateInfo {
	constructor(client, response) {
		this.client = client;
		
		this.id = response.id;
		this.announcements_enabled = response.announcements_enabled;
		this.expires_on = new Date(response.expires_on).getTime();
		this.current_academic_year_id = response.current_academic_year_id;
		this.livechat_enabled = response.livechat_enabled;
		this.locale = response.locale;
		this.online_classes_enabled = response.online_classes_enabled;
		this.student_signup_enabled = response.student_signup_enabled;
		this.teacher_signup_enabled = response.teacher_signup_enabled;
		this.has_shared_files = response.has_shared_files_in_zones;
		this.total_storage_used = response.total_storage_used;
		this.trial = response.trial;
		this.badges = response.badge_ids;
		this.features = response.features;
		this.links = response.links;
	}
}

module.exports = SchoolPrivateInfo;