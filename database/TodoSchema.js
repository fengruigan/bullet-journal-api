const moment = require("moment");
const uuid = require("uuid").v4;

class Todo {
	id;
	content;
	completed;
	start;
	end;
	constructor(options) {
		this.id = uuid();
		let op = options || {};
		this.content = op.content || "Placeholder todo";
		this.completed = op.completed || false;
		this.start = op.start || moment();
		this.end = op.end || moment().add(1, "day");
	}
}

module.exports = Todo;
