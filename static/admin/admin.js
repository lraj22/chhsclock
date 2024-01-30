// dashboard.js - the dashboard manager script

// elements
document.querySelectorAll("[id]").forEach(function (e) { window[e.id] = e; });

// preset items
var allowAuth = 1;
var consoleId = 1;
/*
 * localStorage 'env' usually does not exist,
 * but can indicate the dev environment if set manually.
 * This is to prevent regular users from running into unexpected errors.
 */
var ENVIRONMENT = localStorage.getItem("env");
function log(m, override) {
	if (override || (ENVIRONMENT === "dev")) {
		consoleView.textContent = "[" + (consoleId++) + "] " + m;
	} else {
		console.log.apply(this, arguments);
	}
}

// enter submits the form
function enterToSubmit(e) {
	if (e.key === "Enter") {
		authenticate.click();
	}
}
usnm.addEventListener("keydown", enterToSubmit);
pswd.addEventListener("keydown", enterToSubmit);

// enter moves to next input or authenticates
usnm.addEventListener("keydown", function (e) {
	if (e.key === "Enter") pswd.focus();
});
pswd.addEventListener("keydown", function (e) {
	if (e.key === "Enter") authenticate.click();
});

// manage the username in localStorage
usnm.onkeydown =
	usnm.onkeyup =
	usnm.onchange =
	function () {
		localStorage.setItem(this.id, this.value);
	};
usnm.value = (localStorage.getItem("usnm") || "").trim();
function focusLast() {
	if (pswd.value.trim()) authenticate.focus();
	else if (usnm.value.trim()) pswd.focus();
	else usnm.focus();
}
focusLast();

// user wants to authenticate
function authenticateUser() {
	if (ENVIRONMENT !== "dev") {
		alert("This feature does not work yet.");
		return;
	}
	if (!allowAuth) return;
	allowAuth = 0;
	authenticate.textContent = "Loading...";
	window.uname = usnm.value.trim();
	var passwd = pswd.value;
	window.socket = io.connect("/admdash", {
		query: {
			username: uname,
			password: passwd,
		},
	});
	socket.on("connect_error", function (error) {
		log("Connect error");
	});
	reconnect.addEventListener("click", function () {
		socket.connect();
	});
	socket.on("disconnect", function () {
		log("You have disconnected... trying to reconnect");
	});
	socket.on("connect", function () {
		log("Connected!");
	});
}

authenticate.addEventListener("click", authenticateUser);

log("This page is still in development!", true);