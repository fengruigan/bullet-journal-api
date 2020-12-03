const Todo = require("./TodoSchema"),
	moment = require("moment"),
	db = require("./database.json"),
	fs = require("fs");

const getUser = (options) => {
	return db.users[options.user];
};

const create = (options) => {
	/**
	 *  options are of the form:
	 *  {
	 * 		user: username
	 * 		contentType: category or journal
	 * 		data
	 * 	}
	 */

	let user = getUser(options);
	if (options.contentType) {
		if (options.contentType === "category") {
			// Creating new category
			user.settings.categories.push(options.data);
		} else if (options.contentType === "journal") {
			// Creating new journal list item
			let journal = user.journals;
			let todo = new Todo(options.data);
			let date = todo.creationDate;
			if (!db.journals[journal].hasOwnProperty(date)) {
				db.journals[journal][date] = [];
			}
			db.journals[journal][date].push(todo);
		}
	} else {
		// create new user
	}

	let newDB = JSON.stringify(db, null, "\t");
	fs.writeFile("./database/database.json", newDB, "utf8", () => {
		console.log("database updated");
	});
};

// read
const read = (options) => {
	/**
	 *  options are of the form:
	 *  {
	 * 		user: username
	 * 		contentType: category or journal
	 * 		data: {
	 * 			date,
	 * 			...
	 * 		}
	 * 	}
	 */
	let user = getUser(options);
	if (options.contentType) {
		if (options.contentType === "category") {
			// reading category
			return user.settings.categories;
		} else {
			// reading journal
			let journal = user.journals;
			let date = options.data.date;
			return db.journals[journal][date];
		}
	} else {
		// reading user
		delete user.password;
		return user;
	}
};

// update
const update = (options) => {
	/**
	 *  options are of the form:
	 *  {
	 * 		user: username
	 * 		target: target to update
	 * 		contentType: category or journal
	 * 		data: {
	 * 			newData
	 * 			...
	 * 		}
	 * 	}
	 */
	let user = getUser(options);
	if (options.contentType) {
		if (options.contentType === "category") {
			// Updating category
			user.settings.categories[options.target] = options.data;
		} else if (options.contentType === "journal") {
			// Updating journal list item
			let journal = user.journals;
			let todo = new Todo(options.data);
			let date = todo.creationDate;
			db.journals[journal][date][options.target] = todo;
		}
	} else {
		// Updating user
	}

	let newDB = JSON.stringify(db, null, "\t");
	fs.writeFile("./database/database.json", newDB, "utf8", () => {
		console.log("database updated");
	});
};

// destroy
const destroy = (options) => {
	/**
	 *  options are of the form:
	 *  {
	 * 		user: username
	 * 		target: target to update
	 * 		contentType: category or journal
	 * 		(data : {date})
	 * 	}
	 */
	let user = getUser(options);
	if (options.contentType) {
		if (options.contentType === "category") {
			// Deleting category
			user.settings.categories.splice(options.target, 1);
		} else if (options.contentType === "journal") {
			// Deleting journal list item
			let journal = user.journals;
			db.journals[journal][options.data.date].splice(options.target, 1);
		}
	} else {
		// Updating user
	}

	let newDB = JSON.stringify(db, null, "\t");
	fs.writeFile("./database/database.json", newDB, "utf8", () => {
		console.log("database updated");
	});
};

module.exports = { create, read, update, destroy };
