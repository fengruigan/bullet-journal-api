let express = require("express"),
	app = express(),
	dbManager = require("./database/dbManager"),
	bodyParser = require("body-parser");
cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

// ====================================================================
// 							USER ROUTES
// ====================================================================

// create user
app.post("/api/:user", (req, res) => {
	// let itemArr = req.body;
	// itemArr.forEach((item) => {
	// 	dbManager.create(item);
	// });
	console.log("Creating user");
	console.log(req.body);
	res.sendStatus(200);
});

// read user setting
app.get("/api/:user", (req, res) => {
	let user = req.params.user;
	try {
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
		let response = dbManager.read({
			user,
		});
		res.send(response);
	} catch {
		res.sendStatus(404);
	}
});

// update user setting
app.put("/api/:user", (req, res) => {
	console.log("Updating user");
	console.log(req.body);
	res.sendStatus(200);
});

// destroy user setting
app.delete("/api/:user", (req, res) => {
	console.log("Deleting user");
	console.log(req.body);
	res.sendStatus(200);
});

// ====================================================================
// 							USER SETTING ROUTES
// ====================================================================

// create user setting
app.post("/api/:user/settings", (req, res) => {
	console.log("Creating user settings for " + req.params.user);
	let options = { user: req.params.user, ...req.body };
	try {
		dbManager.create(options);
		res.sendStatus(200);
	} catch {
		console.error("Error creating user setting for " + req.params.user);
		res.sendStatus(500);
	}
});

// read user setting
app.get("/api/:user/settings", (req, res) => {
	let user = req.params.user;
	try {
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
		let response = dbManager.read({
			user,
			contentType: "category",
		});
		res.send(response);
	} catch {
		res.sendStatus(404);
	}
});

// update user setting
app.put("/api/:user/settings", (req, res) => {
	console.log("Updating user settings for " + req.params.user);
	let options = { user: req.params.user, ...req.body };
	try {
		dbManager.update(options);
		res.sendStatus(200);
	} catch {
		console.error("Error updating user setting for " + req.params.user);
		res.sendStatus(500);
	}
});

// destroy user setting
app.delete("/api/:user/settings", (req, res) => {
	console.log("Deleting user settings for " + req.params.user);
	let options = { user: req.params.user, ...req.body };
	try {
		dbManager.destroy(options);
		res.sendStatus(200);
	} catch {
		console.error("Error deleting user setting for " + req.params.user);
		res.sendStatus(500);
	}
});

// ====================================================================
// 							JOURNAL ROUTES
// ====================================================================

// create journal
app.post("/api/:user/journals/", (req, res) => {
	console.log("Creating journal for " + req.params.user);
	let options = { user: req.params.user, ...req.body };
	try {
		dbManager.create(options);
		res.sendStatus(200);
	} catch {
		console.error("Error creating journal for " + req.params.user);
		res.sendStatus(500);
	}
});

// read journal
app.get("/api/:user/journals/:date", (req, res) => {
	let date = req.params.date;
	let user = req.params.user;
	try {
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
		let response = dbManager.read({
			user,
			contentType: "journal",
			data: { date },
		});
		res.send(response);
	} catch {
		console.error("Error reading journal for " + req.params.user);
		res.sendStatus(404);
	}
});

// update journal
app.put("/api/:user/journals/", (req, res) => {
	console.log("Updating journal for " + req.params.user);
	let options = { user: req.params.user, ...req.body };
	try {
		dbManager.update(options);
		res.sendStatus(200);
	} catch {
		console.error("Error updating journal for " + req.params.user);
		res.sendStatus(500);
	}
});

// destroy journal
app.delete("/api/:user/journals/", (req, res) => {
	console.log("Deleting journal for " + req.params.user);
	let options = { user: req.params.user, ...req.body };
	try {
		dbManager.destroy(options);
		res.sendStatus(200);
	} catch {
		console.error("Error deleting journal for " + req.params.user);
		res.sendStatus(500);
	}
});

app.listen(8000, () => {
	console.log("server up");
});
