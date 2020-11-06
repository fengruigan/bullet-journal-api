const Todo = require("./TodoSchema"),
	moment = require("moment"),
	db = require("./database.json"),
	fs = require("fs");

const create = (options) => {
	let op = options || {};
	let todo = new Todo(op);
	let date = todo.creationDate;
	if (!db.hasOwnProperty(date)) {
		db[date] = [];
	}
	db[date].push(todo);
	let newDB = JSON.stringify(db, null, "\t");
	fs.writeFile("./database/database.json", newDB, "utf8", () => {
		console.log("database updated");
	});
};

// read
const read = (options) => {
	let op = options || {};
	if (op.date) {
		return db[op.date];
	}
};

// update
// destroy

module.exports = { create, read };
