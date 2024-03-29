// error handler for safety
window.onerror = function (e) { alert("ERROR: " + e); };

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

var defaultSettings = {
	"enableColonBlink": true,
	"hideTimePeriod": false,
};
var globalSettings = null;

// do forever
function clockwork() {
	var formattedTime = getFormattedTime();
	var isBlinking = (!isShiftDown && globalSettings["enableColonBlink"]);
	if (isBlinking) formattedTime = formattedTime.split(":").join(((Date.now() % 2000) < 1000) ? ":" : " ");
	timeDisplay.textContent = formattedTime;
	currentTimePeriod.textContent = getCurrentPeriod();
	dateDisplay.textContent = getFormattedTime("dddd, MMMM d");
	requestAnimationFrame(clockwork);
}

var socket = io();
socket.on("receiveOverrides", function (overrides) {
	log(JSON.stringify(overrides));
});
socket.on("connect", function () {
	log("Connected to socket.io!");
});

var isShiftDown = false;

function shiftHandler(e) {
	if (e.ctrlKey || e.altKey) return;
	if (e.key === "Shift") {
		if (e.type === "keydown") {
			isShiftDown = true;
			document.body.classList.add("shiftDown");
			document.body.classList.remove("shiftUp");
		} else if (e.type === "keyup") {
			isShiftDown = false;
			document.body.classList.add("shiftUp");
			document.body.classList.remove("shiftDown");
		}
	}
}

window.addEventListener("mousemove", function (e) {
	var percentAcross = (e.clientX / window.innerWidth * 100).toFixed();
	if (percentAcross < 25) document.body.dataset.pointerpos = "left";
	else if (percentAcross > 75) document.body.dataset.pointerpos = "right";
	else document.body.dataset.pointerpos = "center";
});

settingsIcon.addEventListener("click", function settingsBtnClick() {
	document.body.classList.add("settingsView");
});

closeSettingsIcon.addEventListener("click", function closeSettingsBtnClick() {
	document.body.classList.remove("settingsView");
});

// variablize all id elements
document.querySelectorAll("[id]").forEach(function (e) { window[e.id] = e; });

// load settings and setting handlers
globalSettings = localStorage.getItem("chhsclockSettings");
if (!globalSettings) {
	globalSettings = JSON.stringify(cloneObj(defaultSettings));
}
try {
	globalSettings = JSON.parse(globalSettings);
} catch (error) {
	console.error(error);
	globalSettings = cloneObj(defaultSettings);
	localStorage.setItem("chhsclockSettings", JSON.stringify(globalSettings));
}
globalSettings = addObj(defaultSettings, globalSettings);
localStorage.setItem("chhsclockSettings", JSON.stringify(globalSettings));
document.querySelectorAll("[data-setting-name]").forEach(function (e) {
	var settingName = e.getAttribute("data-setting-name");
	if (typeof globalSettings[settingName] === "boolean") {
		e.checked = globalSettings[settingName];
		e.addEventListener("change", saveSettings);
		document.body.setAttribute("data-setting-" + settingName, e.checked);
	}
	if (typeof globalSettings[settingName] === "string") {
		e.value = globalSettings[settingName];
		e.addEventListener("input", saveSettings);
	}
});

// get the clock up and running
requestAnimationFrame(clockwork);

window.addEventListener("keydown", shiftHandler);
window.addEventListener("keyup", shiftHandler);

if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register("./sw.js");
}
