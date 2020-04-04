class Subject {
	constructor(client, response) {
		this.client = client;
		
		this.id = response.id;
		this.name = response.name;
		this.school_id = response.school_private_info_id;
		this.standard_subject_id = response.standard_subject_id;
	}
}

module.exports = Subject;