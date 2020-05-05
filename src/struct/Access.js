class Access {
	constructor(response) {
		this.access_token = response.access_token;
		this.token_type = response.token_type;
		this.expires_in = response.expires_in;
		this.refresh_token = response.refresh_token;
		this.created_timestamp = new Date(response.created_at).getTime();
		this.user_id = response.user_id;
		this.school_id = response.school_id;
		this.user_type = response.user_type;
		this.smhw_token = response.smhw_token;
	}
}

module.exports = Access;