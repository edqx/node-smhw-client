class Event {
	constructor(client, response) {
		this.client = client;
		
		this.id = response.id;
		this.created_timestamp = new Date(response.created_at).getTime();
		this.eventable = response.eventable;
		this.event_type = response.event_type;
		this.user_name = response.user_name;
		this.assignment_id = response.assignment_id;
		this.assignment_title = response.assignment_title;
		this.assignment_type = response.assignment_type;
		this.submission_id = response.submission_id;
		this.eventable_type = response.eventable_type;
		this.read = response.read;
		this.user_id = response.user_id;
		this.parent_forename = response.parent_forename;
		this.parent_surname = response.parent_surname;
		this.student_forename = response.student_forename;
		this.recipient_id = response.recipient_id;
	}
}

module.exports = Event;