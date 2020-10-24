let express = require("express"),
	app = express();

app.get("/api", (req, res) => {
	res.send("Hi");
});

app.listen(8000, () => {
	console.log("server up");
});
