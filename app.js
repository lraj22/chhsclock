const { crypto, fs, io } = require("./server");
const appdata = JSON.parse(fs.readFileSync(__dirname + "/appdata.json").toString());
function writeAppdata() {
	fs.writeFile(__dirname + "/appdata.json", JSON.stringify(appdata), function (err) {
		if (err) throw err;
	});
}

io.on("connection", function (socket) {
	socket.emit("receiveOverrides", appdata.overrides);
});

io.of("/admdash").on("connection", function (socket) {
	socket.emit("receiveOverrides", appdata.overrides);
	socket.on("setOverrides", function (newOverrides) {
		appdata.overrides = newOverrides;
		writeAppdata(newOverrides);
		io.emit("receiveOverrides", appdata.overrides);
	});
});

// check admdash connections
io.of("/admdash").use(function (socket, next) {
	function sendBackError(msg) {
		next(new Error(msg));
	}
	const username = socket.handshake.query.username;
	const password = socket.handshake.query.password;
	if (username && password) {
		if (username !== process.env.ADMDASH_USER) {
			sendBackError("Incorrect credentials");
			return;
		}
		const pwdHash = crypto.createHash("sha256").update(password).digest("hex");
		if (pwdHash !== process.env.ADMDASH_PASS) {
			sendBackError("Incorrect credentials");
			return;
		}
		socket.data.username = username;
		next();
		return;
	}
	sendBackError("invalid");
});
