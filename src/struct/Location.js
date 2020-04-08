class Location {
	constructor(response) {
		this.address = response.address;
		this.town = response.town;
		this.postcode = response.postcode;
		this.country = response.country;
		this.latitude = response.latitude;
		this.longitude = response.longitude;
	}
}

module.exports = Location;