class SubmissionMethod {
	constructor(client, response) {
		this.client = client;
		
		this.id = response.id;
		this.name = response.name;
		this.third_party = response.third_party_submission;
		this.global = response.global;
	}
}

module.exports = SubmissionMethod;