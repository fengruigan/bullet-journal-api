const Todo = require("./TodoSchema"),
	moment = require("moment"),
	db = require("./database.json"),
	fs = require("fs");

const create = (options) => {
	let op = options || {};
	let todo = new Todo(op);
	let today = moment().format("yyyy-MM-DD");
	if (!db.hasOwnProperty(today)) {
		db[today] = [];
	}
	db[today].push(todo);
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
