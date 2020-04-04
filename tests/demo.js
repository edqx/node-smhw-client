const dotenv = require("dotenv");
const ShowMyHomework = require("../index.js");

dotenv.config({ path: "../.env" });

const Client = new ShowMyHomework.Client();

Client.searchSchools(process.env.SMHWSCHOOL).then(function (school) {
	Client.login(school[0].id, process.env.SMHWUSER, process.env.SMHWPASS).then(function () {
		Client.getTodo().then(function (tasks) {
			var tasks_for_tomorrow = tasks.filter(function (task) {
				var today = new Date();
				var tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
				var task_due = new Date(task.due_timestamp);
				
				return tomorrow.getFullYear() == task_due.getFullYear() && tomorrow.getMonth() == task_due.getMonth() && tomorrow.getDate() == task_due.getDate();
			});
			
			console.log(tasks_for_tomorrow);
		});
	});
});