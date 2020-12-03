const moment = require("moment");
const uuid = require("uuid").v4;

class Todo {
	id;
	creationDate;
	content;
	category;
	// completed;
	// crossed;
	constructor(options) {
		this.id = uuid();
		let op = options || {};
		this.creationDate = op.date || moment().format("yyyy-MM-DD");
		this.content = op.content || "Placeholder todo";
		this.category = op.category;
		if (op.hasOwnProperty("crossed")) {
			this.crossed = op.crossed;
		}
		if (op.hasOwnProperty("completed")) {
			this.completed = op.completed;
		}
	}
}

module.exports = Todo;
