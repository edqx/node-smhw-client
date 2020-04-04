class MobileDevice {
	constructor(client, response) {
		this.client = client;
		
		this.id = response.id;
		this.phone_number = response.phone_number;
		this.phone_number_active = response.phone_number_active;
	}
}

module.exports = MobileDevice;