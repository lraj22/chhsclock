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
	"showTimePeriod": true,
	"alwaysShowSettings": true,
	"theme": "dark",
};
var globalSettings = null;
var lastRecordedDay = new Date();

// do forever
function clockwork() {
	var formattedTime = getFormattedTime();
	var now = new Date();
	var isBlinking = (!isShiftDown && globalSettings["enableColonBlink"]);
	if (isBlinking) formattedTime = formattedTime.split(":").join(((Date.now() % 2000) < 1000) ? ":" : " ");
	timeDisplay.textContent = formattedTime;
	currentTimePeriod.textContent = getCurrentPeriod();
	dateDisplay.textContent = getFormattedTime("dddd, MMMM d");
	if (!isSameDay(now, lastRecordedDay)) {
		lastRecordedDay = now;
		schedules.lateStart = scheduleStrObjToTimeObj(schedules.lateStartScheduleObj);
		window.regularSchedule = scheduleStrObjToTimeObj(schedules.regularScheduleObj);
		fetchContext();
	}
	requestAnimationFrame(clockwork);
}

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

// purpose: show different info depending on cursor screen pos (left/middle/right)
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

// big display handling
function bigDisplayify () {
	document.body.classList.toggle("bigDisplayActive");
	this.classList.toggle("bigDisplay");
}

timeOver.addEventListener("click", bigDisplayify);
timeLeft.addEventListener("click", bigDisplayify);
currentTimePeriod.addEventListener("click", bigDisplayify);
timeDisplay.addEventListener("click", bigDisplayify);

// load and process settings
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

// attach listeners for setting changes
document.querySelectorAll("[data-setting-name]").forEach(function (e) {
	var settingName = e.getAttribute("data-setting-name");
	if (typeof globalSettings[settingName] === "boolean") {
		e.checked = globalSettings[settingName];
		e.addEventListener("change", saveSettings);
		document.body.setAttribute("data-setting-" + settingName, e.checked);
	}
	if (typeof globalSettings[settingName] === "string") {
		e.value = globalSettings[settingName];
		document.body.setAttribute("data-setting-" + settingName, e.value);
		e.addEventListener("input", saveSettings);
	}
});

// process all settings
function reprocessSettings () {
	document.body.setAttribute("data-setting-theme", globalSettings.theme);
	currentTimePeriod.style.display = globalSettings.showTimePeriod ? "block": "none";
	if (globalSettings.alwaysShowSettings === true) {
		if (settingsIcon.classList.contains("fadeEnabled")) {
			settingsIcon.classList.remove("fadeEnabled");
		}
	} else {
		if (!settingsIcon.classList.contains("fadeEnabled")) {
			settingsIcon.classList.add("fadeEnabled");
		}
	}
}
reprocessSettings();

// get the clock up and running
requestAnimationFrame(clockwork);

window.addEventListener("keydown", shiftHandler);
window.addEventListener("keyup", shiftHandler);

// fetch context and process when ready
function fetchContext () {
	fetch("https://lraj22.github.io/chhsclock-data/data/context.json")
		.then(res => res.json())
		.then(function (rawContext) {
			var parsedContext = cloneObj(rawContext);
			parsedContext.full_day_overrides.forEach(function (currentSchedule, i) {
				var schedule = ((typeof currentSchedule.schedule === "string") ? schedules[currentSchedule.schedule + "ScheduleObj"] : currentSchedule.schedule);
				parsedContext.full_day_overrides[i].schedule = scheduleStrObjToTimeObj(schedule);
			});
			parsedContext.timeframe_overrides.forEach(function (currentAppliesBlock, i) {
				parsedContext.timeframe_overrides[i].applies = scheduleStrArrToTimeArr(currentAppliesBlock.applies);
			});
			
			// avoid modifying this object elsewhere; cloneObj() has been removed
			window.chhsclockContext = parsedContext;
		});
}
fetchContext();

window.addEventListener("load", function () {
	loaded();
});

function loaded () {
	var threshold = 2; // waiting for 2 flags: window.onload & 1 onloadCSS
	if (!navigator.onLine) threshold = 1; // just wait for load
	loadFlags++;
	if (loadFlags >= threshold) {
		document.body.classList.remove("stillLoading");
	}
}

if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register("./sw.js");
}
