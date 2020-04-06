const SpellingTestTrayTask = require("./SpellingTestTrayTask.js");

class SpellingTestTray {
	constructor(client, response) {
		this.client = client;
		
		this.id = response.id;
		this.title = response.title;
		this.spelling_test_id = response.spelling_test_id;
		this.task_ids = response.task_ids;
	}
	
	getTasks(...ids) {
		var _this = this;
		
		if (Array.isArray(ids[0])) {
			ids = ids[0];
		}
		
		var tasks;
		if (ids.length) {
			tasks = ids.map(tid => "ids%5B%5D=" + tid).join("&");
		} else {
			tasks = _this.task_ids.map(tid => "ids%5B%5D=" + tid).join("&");
		}
		
		return new Promise(function (resolve, reject) {
			_this.client.make("GET", "/api/spelling_test_tray_tasks?" + tasks)
			.then(function (response) {
				resolve(response.spelling_test_tray_tasks.map(_ => new SpellingTestTrayTask(_this.client, _)));
			}).catch(function(err) {
				reject(err);
			});
		});
	}
}

module.exports = SpellingTestTray;