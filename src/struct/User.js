const ContactInfo = require("./ContactInfo.js");

class User {
	constructor(client, response) {
		this.client = client;
		
		this.id = response.id;
		this.disabled = response.disabled;
		this.avatar = response.avatar;
		this.avatar_large_thumb = response.avatar_large_thumb;
		this.avatar_small_thumb = response.avatar_small_thumb;
		this.created_timestamp = new Date(response.created_at).getTime();
		this.type = response.backend_type;
		this.forename = response.forename;
		this.mobile_beta_user = response.mobile_beta_user;
		this.school_id = response.school_id;
		this.surname = response.surname;
		this.title = response.title;
		this.updated_timestamp = new Date(response.updated_at).getTime();
		this.left_at = response.left_at;
		this.user_private_info_id = response.user_private_info_id;
		this.user_identity_id = response.user_identity_id;
		this.student_friday_summary = response.student_friday_summary;
		this.student_overdue_summary = response.student_overdue_summary;
		this.student_marked_homework = response.student_marked_homework;
		this.teacher_summary = response.teacher_summary;
		this.sims_id = response.sims_id;
		this.teacher_stats = response.teacher_stats;
		this.bio = response.bio;
		this.contact = new ContactInfo(response);
		this.push_notifications_enabled = response.push_notifications_enabled;
		this.anonymous = response.anonymous;
	}
}

module.exports = User;