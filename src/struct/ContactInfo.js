class ContactInfo {
	constructor(response) {
		this.phone_number = response.phone_number;
		this.email = response.email;
		this.website = response.website;
		this.twitter = response.twitter;
		this.facebook = response.facebook;
		this.instagram = response.instagram;
		this.pintrest = response.pintrest;
		this.linked_in = response.linked_in;
	}
}

module.exports = ContactInfo;