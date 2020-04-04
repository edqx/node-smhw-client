class QuizQuestion {
	constructor(client, response) {
		this.client = client;
		
		this.id = response.id;
		this.correct_answer = response.correct_answer;
		this.incorrect_answers = response.incorrect_answers;
		this.image_small_url = response.image_small_url;
		this.image_xsmall_url = response.image_xsmall_url;
		this.image_large_url = response.image_large_url;
		this.image_file_name = response.image_file_name;
		this.description = response.description;
		this.created_timestamp = new Date(response.created_at).getTime();
		this.is_preparing = response.is_preparing;
		this.updated_timestamp = new Date(response.updated_at).getTime();
	}
}

module.exports = QuizQuestion;