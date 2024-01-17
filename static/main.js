// error handler for safety
window.onerror = function (e) { alert("ERROR: " + e); };

var consoleId = 1;
console.log = function (m) {
	consoleView.textContent = "[" + (consoleId++) + "] " + m;
};

/*! loadCSS. [c]2020 Filament Group, Inc. MIT License */
/*! Minifed */
!function(e){"use strict";var n=function(n,t,r,i){var o,d=e.document,a=d.createElement("link");if(t)o=t;else{var f=(d.body||d.getElementsByTagName("head")[0]).childNodes;o=f[f.length-1]}var l=d.styleSheets;if(i)for(var s in i)i.hasOwnProperty(s)&&a.setAttribute(s,i[s]);a.rel="stylesheet",a.href=n,a.media="only x",!function e(n){if(d.body)return n();setTimeout(function(){e(n)})}(function(){o.parentNode.insertBefore(a,t?o:o.nextSibling)});var u=function(e){for(var n=a.href,t=l.length;t--;)if(l[t].href===n)return e();setTimeout(function(){u(e)})};function c(){a.addEventListener&&a.removeEventListener("load",c),a.media=r||"all"}return a.addEventListener&&a.addEventListener("load",c),a.onloadcssdefined=u,u(c),a};"undefined"!=typeof exports?exports.loadCSS=n:e.loadCSS=n}("undefined"!=typeof global?global:this);
loadCSS("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap");

var isShiftDown = false;

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

// cloneObj function taken from https://stackoverflow.com/a/7574273
function cloneObj(obj) {
	if (obj == null || typeof (obj) != 'object') {
		return obj;
	}

	var clone = new obj.constructor();
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			clone[key] = cloneObj(obj[key]);
		}
	}

	return clone;
}
function addObj(original, addme) {
	var combined = cloneObj(original);
	if (typeof addme !== "object") return combined;
	for (var key in addme) {
		if (addme.hasOwnProperty(key)) {
			combined[key] = addme[key];
		}
	}
	return combined;
}
function saveSettings() {
	var constructedSettings = {};
	document.querySelectorAll("[data-setting-name]").forEach(function(e) {
		var settingName = e.getAttribute("data-setting-name");
		if(e.type === "checkbox"){
			constructedSettings[settingName] = e.checked;
			document.body.setAttribute("data-setting-" + settingName, e.checked);
		}
		if(e.type === "text") constructedSettings[settingName] = e.value;
	});
	globalSettings = cloneObj(constructedSettings);
	localStorage.setItem("chhsclockSettings", JSON.stringify(globalSettings));
}

var defaultSettings = {
	"enableColonBlink": true,
	"hideTimePeriod": false,
};
var globalSettings = null;

// page is loaded and ready to go
function ready() {
	// variablize all id elements
	document.querySelectorAll("[id]").forEach(function (e) { window[e.id] = e; });

	// load settings and setting handlers
	globalSettings = localStorage.getItem("chhsclockSettings");
	if (!globalSettings) {
		globalSettings = JSON.stringify(cloneObj(defaultSettings));
	}
	try{
		globalSettings = JSON.parse(globalSettings);
	}catch(error){
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
}

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

window.addEventListener("load", ready);
window.addEventListener("keydown", shiftHandler);
window.addEventListener("keyup", shiftHandler);

window.addEventListener("mousemove", function (e) {
	var percentAcross = (e.clientX / window.innerWidth * 100).toFixed();
	if (percentAcross < 25) document.body.dataset.pointerpos = "left";
	else if (percentAcross > 75) document.body.dataset.pointerpos = "right";
	else document.body.dataset.pointerpos = "center";
});

function timeStrToObj(time) {
	return new Date(Date.parse(time + getFormattedTime(", MMMM d, yyyy")));
}

function settingsBtnClick() {
	document.body.classList.add("settingsView");
}

settingsIcon.addEventListener("click", settingsBtnClick);

function closeSettingsBtnClick() {
	document.body.classList.remove("settingsView");
}

closeSettingsIcon.addEventListener("click", closeSettingsBtnClick);

function msToTimeDiff(ms, f) {
	var timeSeconds = (f ? f : Math.round)(ms / 1000);
	var outComponents = [];
	if (timeSeconds >= 3600) {
		outComponents.push(Math.floor(timeSeconds / 3600).toString());
		timeSeconds %= 3600;
	}
	if (timeSeconds >= 60) {
		outComponents.push(Math.floor(timeSeconds / 60).toString());
		timeSeconds %= 60;
	}
	outComponents.push(timeSeconds.toString());
	if (outComponents.length > 2) {
		outComponents[1] = outComponents[1].padStart(2, "0");
	}
	if (outComponents.length > 1) {
		let lastIndex = outComponents.length - 1;
		outComponents[lastIndex] = outComponents[lastIndex].padStart(2, "0");
		return outComponents.join(":");
	} else {
		return outComponents[0] + "s";
	}
}

var noSchedule = {};

var lateStartSchedule = {
	"Get to 1st period": ["9:20 AM - 9:25 AM"],
	"1st period": ["9:25 AM - 10:14 AM"],
	"1st-2nd passing period": ["10:14 AM - 10:20 AM"],
	"2nd period": ["10:20 AM - 11:12 AM"],
	"2nd-3rd passing period": ["11:12 AM - 11:18 AM"],
	"3rd period": ["11:18 AM - 12:07 PM"],
	"3rd-4th passing period": ["12:07 PM - 12:13 PM"],
	"4th period": ["12:13 PM - 1:02 PM"],
	"Lunch": ["1:02 PM - 1:32 PM"],
	"Lunch-5th passing period": ["1:32 PM - 1:38 PM"],
	"5th period": ["1:38 PM - 2:27 PM"],
	"5th-6th passing period": ["2:27 PM - 2:33 PM"],
	"6th period": ["2:33 PM - 3:22 PM"],
	"School's over!": ["3:22 PM - 3:30 PM"],
};

var regularSchedule = {
	"Get to 1st period": ["8:30 AM - 8:35 AM"],
	"1st period": ["8:35 AM - 9:32 AM"],
	"1st-2nd passing period": ["9:32 AM - 9:38 AM"],
	"2nd period": ["9:38 AM - 10:40 AM"],
	"2nd-3rd passing period": ["10:40 AM - 10:46 AM"],
	"3rd period": ["10:46 AM - 11:43 AM"],
	"3rd-4th passing period": ["11:43 AM - 11:49 AM"],
	"4th period": ["11:49 AM - 12:46 PM"],
	"Lunch": ["12:46 PM - 1:16 PM"],
	"Lunch-5th passing period": ["1:16 PM - 1:22 PM"],
	"5th period": ["1:22 PM - 2:19 PM"],
	"5th-6th passing period": ["2:19 PM - 2:25 PM"],
	"6th period": ["2:25 PM - 3:22 PM"],
	"School's over!": ["3:22 PM - 3:30 PM"],
};

function getCurrentSchedule() {
	var dayOfTheWeek = new Date().getDay();
	if (dayOfTheWeek === 1) { // if today is Monday
		return lateStartSchedule;
	}
	if ((dayOfTheWeek > 1) && (dayOfTheWeek < 6)) {
		return regularSchedule;
	}
	return noSchedule;
}

function getCurrentPeriod() {
	var d = new Date();
	var currentSchedule = getCurrentSchedule();
	var timePeriods = Object.keys(currentSchedule);
	var i;
	for (i = 0; i < timePeriods.length; i++) {
		let timePeriod = timePeriods[i];
		let j = 0;
		for (j = 0; j < currentSchedule[timePeriod].length; j++) {
			let timeBlock = currentSchedule[timePeriod][j].split("-");
			let startTime = timeStrToObj(timeBlock[0].trim());
			let endTime = timeStrToObj(timeBlock[1].trim());
			if ((d > startTime) && (d < endTime)) {
				timeOver.textContent = msToTimeDiff(d - startTime, Math.ceil) + " over";
				timeLeft.textContent = msToTimeDiff(endTime - d, Math.floor) + " left";
				return timePeriod;
			}
		}
	}
	timeOver.textContent = "";
	timeLeft.textContent = "";
}

function getFormattedTime(format) {
	if (!format) {
		format = "h:mm";
	}
	var date = new Date();
	var MMMM = ["\x00", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var MMM = ["\x01", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var dddd = ["\x02", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var ddd = ["\x03", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	function ii(i, len) {
		var s = i + "";
		len = len || 2;
		while (s.length < len) s = "0" + s;
		return s;
	}

	var y = date.getFullYear();
	format = format.replace(/(^|[^\\])yyyy+/g, "$1" + y);
	format = format.replace(/(^|[^\\])yy/g, "$1" + y.toString().substr(2, 2));
	format = format.replace(/(^|[^\\])y/g, "$1" + y);

	var M = date.getMonth() + 1;
	format = format.replace(/(^|[^\\])MMMM+/g, "$1" + MMMM[0]);
	format = format.replace(/(^|[^\\])MMM/g, "$1" + MMM[0]);
	format = format.replace(/(^|[^\\])MM/g, "$1" + ii(M));
	format = format.replace(/(^|[^\\])M/g, "$1" + M);

	var d = date.getDate();
	format = format.replace(/(^|[^\\])dddd+/g, "$1" + dddd[0]);
	format = format.replace(/(^|[^\\])ddd/g, "$1" + ddd[0]);
	format = format.replace(/(^|[^\\])dd/g, "$1" + ii(d));
	format = format.replace(/(^|[^\\])d/g, "$1" + d);

	var H = date.getHours();
	format = format.replace(/(^|[^\\])HH+/g, "$1" + ii(H));
	format = format.replace(/(^|[^\\])H/g, "$1" + H);

	var h = H > 12 ? H - 12 : H == 0 ? 12 : H;
	format = format.replace(/(^|[^\\])hh+/g, "$1" + ii(h));
	format = format.replace(/(^|[^\\])h/g, "$1" + h);

	var m = date.getMinutes();
	format = format.replace(/(^|[^\\])mm+/g, "$1" + ii(m));
	format = format.replace(/(^|[^\\])m/g, "$1" + m);

	var s = date.getSeconds();
	format = format.replace(/(^|[^\\])ss+/g, "$1" + ii(s));
	format = format.replace(/(^|[^\\])s/g, "$1" + s);

	var T = H < 12 ? "AM" : "PM";
	format = format.replace(/(^|[^\\])TT+/g, "$1" + T);
	format = format.replace(/(^|[^\\])T/g, "$1" + T.charAt(0));

	var t = T.toLowerCase();
	format = format.replace(/(^|[^\\])tt+/g, "$1" + t);
	format = format.replace(/(^|[^\\])t/g, "$1" + t.charAt(0));

	var day = date.getDay() + 1;
	format = format.replace(new RegExp(dddd[0], "g"), dddd[day]);
	format = format.replace(new RegExp(ddd[0], "g"), ddd[day]);

	format = format.replace(new RegExp(MMMM[0], "g"), MMMM[M]);
	format = format.replace(new RegExp(MMM[0], "g"), MMM[M]);

	format = format.replace(/\\(.)/g, "$1");

	return format;
}

if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register("./sw.js");
}