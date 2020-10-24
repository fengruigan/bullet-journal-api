const Todo = require("./TodoSchema"),
	uuid = require("uuid").v4,
	moment = require("moment"),
	db = require("./database.json"),
	fs = require("fs");

class dbManager {
	// create
	create(options) {
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
	}

	// read
	read(options) {
		let op = options || {};
		if (op.date) {
			return db[op.date];
		}
	}

	// update
	// destroy
}

let dbM = new dbManager();
console.log(dbM.read({ date: moment().format("yyyy-MM-DD") }));
