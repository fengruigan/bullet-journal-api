let express = require("express"),
	app = express(),
	dbManager = require("./database/dbManager"),
	bodyParser = require("body-parser");
cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

app.get("/api", (req, res) => {
	res.send("Hi");
});

// read
app.get("/api/:date", (req, res) => {
	let date = req.params.date;
	let response;
	try {
		response = dbManager.read({ date });
		res.send(response);
	} catch {
		res.sendStatus(404);
	}
});

// create
app.post("/api", async (req, res) => {
	// let itemArr = req.body;
	// itemArr.forEach((item) => {
	// 	dbManager.create(item);
	// });
	res.sendStatus(200);
});

// update

// destroy

app.listen(8000, () => {
	console.log("server up");
});
