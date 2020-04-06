const ClassGroupIncomplete = require("./ClassGroupIncomplete.js");

class ClassGroup extends ClassGroupIncomplete {
	constructor(client, response) {
		super(client, response);
		
		this.links = response.links;
		this.student_ids = response.student_ids;
		this.teacher_ids = response.teacher_ids;
		this.left_timestamp = new Date(response.left_at).getTime();
		
		this.incomplete = false;
	}
}

module.exports = ClassGroup;