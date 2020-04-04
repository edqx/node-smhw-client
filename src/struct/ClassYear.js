class ClassYear {
	constructor(client, response) {
		this.client = client;
		
		this.id = response.id;
		this.name = response.name;
		this.active = response.name;
		this.school_id = response.school_id;
		this.position = response.position;
		this.created_timestamp = new Date(response.created_at).getTime();
		this.updated_timestamp = new Date(response.updated_at).getTime();
	}
}

module.exports = ClassYear;