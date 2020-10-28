const db = require("./database.json"),
	dbManager = require("./dbManager"),
	moment = require("moment");

const m = moment();
const json = JSON.stringify(m);
const o = JSON.parse(json);

// dbManager.create();
