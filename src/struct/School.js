const ContactInfo = require("./ContactInfo");
const Location = require("./Location.js");
const SchoolIncomplete = require("./SchoolIncomplete.js");

class School extends SchoolIncomplete {
	constructor(client, response) {
		super(client, response);
		
		this.description = response.description;
		this.school_type = response.school_type;
		this.created_timestamp = new Date(response.created_at).getTime();
		this.updated_timestamp = new Date(response.updated_at).getTime();
		this.contact_info = new ContactInfo(client, response);
		this.logo_url = response.logo_url;
		this.logo_name = response.logo_name;
		this.banner_url = response.banner_url;
		this.banner_name = response.banner_name;
		this.premium_features = response.premium_features;
		this.prospectus_url = response.prospectus;
		this.prospectus_name = response.prospectus;
		this.native_apps_task_advert = response.native_apps_task_advert;
		this.homepage_zones = response.homepage_zones;
		this.homepage_active = response.homepage_active;
		this.homepage_background = response.homepage_background;
		this.student_zone_root_id = response.student_zone_root_id;
		this.school_zone_root_id = response.school_zone_root_id;
		this.parent_zone_root_id = response.parent_zone_root_id;
		this.links = response.links;
		this.book_store = response.book_store;
		this.collins_settings = response.collins_settings;
		this.active = true;
		this.google_tts = response.google_tts;
		this.new_dashboard_enabled = response.is_new_dashboard_enabled;
		this.share_kudos_comments_enabled = response.share_kudos_comments_enabled;
		this.only_positive_kudos_enabled = response.only_positive_kudos_enabled;
		this.new_students_list_enabled = response.new_students_list_enabled;
		
		this.incomplete = false;
	}
}

module.exports = School;