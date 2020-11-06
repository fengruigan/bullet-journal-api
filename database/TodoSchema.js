const moment = require("moment");
const uuid = require("uuid").v4;

class Todo {
	id;
	creationDate;
	content;
	type;
	completed;
	start;
	end;
	constructor(options) {
		this.id = uuid();
		let op = options || {};
		this.creationDate = op.date;
		this.content = op.content || "Placeholder todo";
		this.type = op.type;
		if (op.start) {
			this.start = op.start;
			this.end = op.end || moment().add(1, "day").format("yyyy-MM-DD");
		}
		if (op.completed) {
			this.completed = op.completed;
		}
	}
}

module.exports = Todo;
