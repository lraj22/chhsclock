const http = require("http");
const fs = require("fs");
require("dotenv").config();

const avTag = "";

const httpServer = http.createServer(function (req, res) {
	// generic responder
	function e(s, t, h) { res.writeHead(s, h); res.end(t); }

	function sendBack(filepath, headers) {
		const replaceAvTags = (filepath.split(".").slice(-1)[0] === "html");
		fs.readFile(__dirname + filepath, function (err, data) {
			if (err) e(404);
			else e(200, replaceAvTags ? (data.toString().split("$AUTO_VERSIONING_TAG$").join(avTag)) : data, headers);
		});
	}
	var url = req.url.split("?")[0];
	if (url.endsWith("/")) {
		url += "index.html";
	}

	// headers object
	let headers = {};
	headers["X-Content-Type-Options"] = "nosniff";
	headers["Content-Type"] = "text/plain; charset=utf-8";
	headers["Cache-Control"] = "max-age=31536000, immutable";

	// add more headers based on path
	var mimeMap = {
		html: "text/html; charset=utf-8",
		css: "text/css; charset=utf-8",
		js: "text/javascript; charset=utf-8",
		png: "image/png",
		svg: "image/svg+xml",
		mp3: "audio/mpeg",
	};
	var extension = url.split(".").slice(-1)[0];
	if (mimeMap[extension]) {
		headers["Content-Type"] = mimeMap[extension];
	}
	if (extension === "html") {
		headers["Content-Security-Policy"] = "default-src 'self'; style-src-elem 'self' fonts.googleapis.com; font-src fonts.gstatic.com";
		headers["Cache-Control"] = "no-cache";
	}

	// various socket.io files
	const socketAdminBase = "/sockets/admin/";
	if (url.startsWith(socketAdminBase)) {
		sendBack("/node_modules/@socket.io/admin-ui/ui/dist/" + (url.slice(socketAdminBase.length) || "index.html"), headers);
		return;
	}

	sendBack("/static" + url, headers);
});

// set up socket.io with the admin ui
const SocketIO = require("socket.io");
const AdminUI = require("@socket.io/admin-ui");
const io = new SocketIO.Server(httpServer, {
	connectionStateRecovery: {
		maxDisconnectionDuration: 45 * 1000,
		skipMiddlewares: true,
	},
});
AdminUI.instrument(io, {
	// auth: false,
	auth:{
		type: "basic",
		username: process.env.SA_USER,
		password: process.env.SA_PASS.replace(/\\/g, ""),
	},
});
httpServer.listen(process.env.PORT || 8080);

// export stuff for app.js to use
module.exports = { io };
