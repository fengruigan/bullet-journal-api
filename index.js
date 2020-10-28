let express = require("express"),
	app = express(),
	dbManager = require("./database/dbManager"),
	cors = require("cors");

app.use(cors());

app.get("/api", (req, res) => {
	res.send("Hi");
});

// read
app.get("/api/:date", (req, res) => {
	let date = req.params.date;
	let response = dbManager.read({ date });
	res.send(response);
});

// create
app.post("/api/:date", (req, res) => {
	res.send("In construction");
});

// update

// destroy

app.listen(8000, () => {
	console.log("server up");
});
