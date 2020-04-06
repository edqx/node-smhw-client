class SpellingTestTrayTask {
	constructor(client, response) {
		this.client = client;
		
		this.id = response.id;
		this.text = response.text;
		this.tray_id = response.tray_id;
		this.definition = response.definition;
		this.sentence = response.sentence;
		this.file_url = response.file_url;
	}
}

module.exports = SpellingTestTrayTask;