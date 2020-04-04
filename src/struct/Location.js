class Location {
	constructor(client, response) {
		this.client = client;
		
		this.address = response.address;
		this.town = response.town;
		this.postcode = response.postcode;
		this.country = response.country;
		this.latitude = response.latitude;
		this.longitude = response.longitude;
	}
}

module.exports = Location;