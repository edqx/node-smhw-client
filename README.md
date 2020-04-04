# node-shmw-client
[npm repository](http://npmjs.com/package/node-smhw-client)

node-shmw-client is a completely promise-based wrapper for the showmyhomework api. Unfortunately there doesn't actually seem to be any real support for the api other than for the website and for the app, so documentation is very limited other than what I could find on the networks tab on Chrome and looking around the pages. This means the code might be inconsistent at times or messy.

## Examples
### Getting all tasks for tomorrow

```js
const Client = new ShowMyHomework.Client();

Client.searchSchools("Elk Valley Elementary").then(function (school) {
	Client.login(school[0].id, "biglad1@biglads.com", "password").then(function () {
		Client.getTodo().then(function (tasks) {
			var tasks_for_tomorrow = tasks.filter(function (task) {
				var today = new Date();
				var tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
				var task_due = new Date(task.due_timestamp);
				
				return tomorrow.getFullYear() == task_due.getFullYear() && tomorrow.getMonth() == task_due.getMonth() && tomorrow.getDate() == task_due.getDate();
			});
			
			console.log(tasks_for_tomorrow); // Array of Task objects
		});
	});
});
```

### Getting yours or teachers comments on homework
```js
Client.getHomework("homework id").then(function (homework) {
	homework.getOwnSubmission().then(function (submission) {
		submission.getComments().then(function (comments) {
			console.log(comments); // Array of SubmissionComment objects
		});
	});
});
```

## Other
Might write documentation if anyone uses this, but for now just look around. I am not responsible for anything you do using this library.