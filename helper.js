// helper.js
// This file contains helper functions, important data, and library functions.

var loadFlags = 0;

/*! loadCSS. [c]2020 Filament Group, Inc. MIT License */
/*! Minifed */
!function(e){"use strict";var n=function(n,t,r,i){var o,d=e.document,a=d.createElement("link");if(t)o=t;else{var f=(d.body||d.getElementsByTagName("head")[0]).childNodes;o=f[f.length-1]}var l=d.styleSheets;if(i)for(var s in i)i.hasOwnProperty(s)&&a.setAttribute(s,i[s]);a.rel="stylesheet",a.href=n,a.media="only x",!function e(n){if(d.body)return n();setTimeout(function(){e(n)})}(function(){o.parentNode.insertBefore(a,t?o:o.nextSibling)});var u=function(e){for(var n=a.href,t=l.length;t--;)if(l[t].href===n)return e();setTimeout(function(){u(e)})};function c(){a.addEventListener&&a.removeEventListener("load",c),a.media=r||"all"}return a.addEventListener&&a.addEventListener("load",c),a.onloadcssdefined=u,u(c),a};"undefined"!=typeof exports?exports.loadCSS=n:e.loadCSS=n}("undefined"!=typeof global?global:this);
/*! onloadCSS. (onload callback for loadCSS) [c]2017 Filament Group, Inc. MIT License */
/*! Minifed */
function onloadCSS(n,a){var d;function t(){!d&&a&&(d=!0,a.call(n))}n.addEventListener&&n.addEventListener("load",t),n.attachEvent&&n.attachEvent("onload",t),"isApplicationInstalled"in navigator&&"onloadcssdefined"in n&&n.onloadcssdefined(t)}
onloadCSS(
	loadCSS("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=block"),
	function () {
		loaded();
	}
);

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var schedules = {};

schedules.noneScheduleObj = {};
schedules.none = {};

schedules.noSchoolScheduleObj = {
	"No school": ["8:00 AM -- 3:22 PM"]
};
schedules.noSchool = scheduleStrObjToTimeObj(schedules.noSchoolScheduleObj);

schedules.lateStartScheduleObj = {
	"Waiting for first bell": ["8:00 AM -- 9:20 AM"],
	"Get to 1st period": ["9:20 AM -- 9:25 AM"],
	"1st period": ["9:25 AM -- 10:14 AM"],
	"1st-2nd passing period": ["10:14 AM -- 10:20 AM"],
	"2nd period": ["10:20 AM -- 11:12 AM"],
	"2nd-3rd passing period": ["11:12 AM -- 11:18 AM"],
	"3rd period": ["11:18 AM -- 12:07 PM"],
	"3rd-4th passing period": ["12:07 PM -- 12:13 PM"],
	"4th period": ["12:13 PM -- 1:02 PM"],
	"Lunch": ["1:02 PM -- 1:32 PM"],
	"Lunch-5th passing period": ["1:32 PM -- 1:38 PM"],
	"5th period": ["1:38 PM -- 2:27 PM"],
	"5th-6th passing period": ["2:27 PM -- 2:33 PM"],
	"6th period": ["2:33 PM -- 3:22 PM"],
	"School's over!": ["3:22 PM -- 4:00 PM"],
};
schedules.lateStart = scheduleStrObjToTimeObj(schedules.lateStartScheduleObj);

schedules.regularScheduleObj = {
	"Waiting for first bell": ["8:00 AM -- 8:30 AM"],
	"Get to 1st period": ["8:30 AM -- 8:35 AM"],
	"1st period": ["8:35 AM -- 9:32 AM"],
	"1st-2nd passing period": ["9:32 AM -- 9:38 AM"],
	"2nd period": ["9:38 AM -- 10:40 AM"],
	"2nd-3rd passing period": ["10:40 AM -- 10:46 AM"],
	"3rd period": ["10:46 AM -- 11:43 AM"],
	"3rd-4th passing period": ["11:43 AM -- 11:49 AM"],
	"4th period": ["11:49 AM -- 12:46 PM"],
	"Lunch": ["12:46 PM -- 1:16 PM"],
	"Lunch-5th passing period": ["1:16 PM -- 1:22 PM"],
	"5th period": ["1:22 PM -- 2:19 PM"],
	"5th-6th passing period": ["2:19 PM -- 2:25 PM"],
	"6th period": ["2:25 PM -- 3:22 PM"],
	"School's over!": ["3:22 PM -- 4:00 PM"],
};
schedules.regular = scheduleStrObjToTimeObj(schedules.regularScheduleObj);

schedules.rallyScheduleObj = {
	"Waiting for first bell": ["8:00 AM -- 8:30 AM"],
	"Get to 1st period": ["8:30 AM -- 8:35 AM"],
	"1st period": ["8:35 AM -- 9:21 AM"],
	"1st-2nd passing period": ["9:21 AM -- 9:27 AM"],
	"2nd period": ["9:27 AM -- 10:13 AM"],
	"2nd-3rd passing period": ["10:13 AM -- 10:19 AM"],
	"3rd period/First rally": ["10:19 AM -- 11:24 AM"],
	"3rd period/Second rally": ["11:25 AM -- 12:16 PM"],
	"3rd/Rally-4th passing period": ["12:16 PM -- 12:22 PM"],
	"4th period": ["12:22 PM -- 1:08 PM"],
	"Lunch": ["1:08 PM -- 1:38 PM"],
	"Lunch-5th passing period": ["1:38 PM -- 1:44 PM"],
	"5th period": ["1:44 PM -- 2:30 PM"],
	"5th-6th passing period": ["2:30 PM -- 2:36 PM"],
	"6th period": ["2:36 PM -- 3:22 PM"],
	"School's over!": ["3:22 PM -- 4:00 PM"]
};
schedules.rally = scheduleStrObjToTimeObj(schedules.rallyScheduleObj);

schedules.minimumScheduleObj = {
	"Waiting for first bell": ["8:00 AM -- 8:30 AM"],
	"Get to 1st period": ["8:30 AM -- 8:35 AM"],
	"1st period": ["8:35 AM -- 9:17 AM"],
	"1st-2nd passing period": ["9:17 AM -- 9:23 AM"],
	"2nd period": ["9:23 AM -- 10:05 AM"],
	"2nd-3rd passing period": ["10:05 AM -- 10:11 AM"],
	"3rd period": ["10:11 AM -- 10:53 AM"],
	"3rd-4th passing period": ["10:53 AM -- 10:59 AM"],
	"4th period": ["10:59 AM -- 11:41 AM"],
	"4th-5th passing period": ["11:41 AM -- 11:47 AM"],
	"5th period": ["11:47 AM -- 12:29 PM"],
	"5th-6th passing period": ["12:29 PM -- 12:35 PM"],
	"6th period": ["12:35 PM -- 1:17 PM"],
	"School's over!": ["1:17 PM -- 2:00 PM"],
};
schedules.minimum = scheduleStrObjToTimeObj(schedules.minimumScheduleObj);

schedules.blockOneScheduleObj = {
	"Waiting for first bell": ["8:00 AM -- 8:30 AM"],
	"Get to 1st period": ["8:30 AM -- 8:35 AM"],
	"1st period": ["8:35 AM -- 10:37 AM"],
	"1st-3rd passing period": ["10:37 AM -- 10:43 AM"],
	"3rd period": ["10:43 AM -- 12:45 PM"],
	"Lunch": ["12:45 AM -- 1:15 PM"],
	"Lunch-5th passing period": ["1:15 PM -- 1:21 PM"],
	"5th period": ["1:21 PM -- 3:22 PM"],
	"School's over!": ["3:22 PM -- 3:30 PM"]
};
schedules.blockOne = scheduleStrObjToTimeObj(schedules.blockOneScheduleObj);

schedules.blockTwoScheduleObj = {
	"Waiting for first bell": ["8:00 AM -- 8:30 AM"],
	"Get to 2nd period": ["8:30 AM -- 8:35 AM"],
	"2nd period": ["8:35 AM -- 10:37 AM"],
	"2nd-4th passing period": ["10:37 AM -- 10:43 AM"],
	"4th period": ["10:43 AM -- 12:45 PM"],
	"Lunch": ["12:45 AM -- 1:15 PM"],
	"Lunch-6th passing period": ["1:15 PM -- 1:21 PM"],
	"6th period": ["1:21 PM -- 3:22 PM"],
	"School's over!": ["3:22 PM -- 3:30 PM"]
};
schedules.blockTwo = scheduleStrObjToTimeObj(schedules.blockTwoScheduleObj);

schedules.finalsBlockOneScheduleObj = {
	"Waiting for first bell": ["8:00 AM -- 8:30 AM"],
	"Get to 1st period": ["8:30 AM -- 8:35 AM"],
	"1st period": ["8:35 AM -- 10:04 AM"],
	"1st-3rd passing period": ["10:04 AM -- 10:10 AM"],
	"3rd period": ["10:10 AM -- 11:39 AM"],
	"Lunch": ["11:39 AM -- 12:09 PM"],
	"Lunch-5th passing period": ["12:09 PM -- 12:15 PM"],
	"5th period": ["12:15 PM -- 1:44 PM"],
	"School's over!": ["1:44 PM -- 2:00 PM"]
};
schedules.finalsBlockOne = scheduleStrObjToTimeObj(schedules.finalsBlockOneScheduleObj);

schedules.finalsBlockTwoScheduleObj = {
	"Waiting for first bell": ["8:00 AM -- 8:30 AM"],
	"Get to 2nd period": ["8:30 AM -- 8:35 AM"],
	"2nd period": ["8:35 AM -- 10:04 AM"],
	"2nd-4th passing period": ["10:04 AM -- 10:10 AM"],
	"4th period": ["10:10 AM -- 11:39 AM"],
	"Lunch": ["11:39 AM -- 12:09 PM"],
	"Lunch-6th passing period": ["12:09 PM -- 12:15 PM"],
	"6th period": ["12:15 PM -- 1:44 PM"],
	"School's over!": ["1:44 PM -- 2:00 PM"]
};
schedules.finalsBlockTwo = scheduleStrObjToTimeObj(schedules.finalsBlockTwoScheduleObj);

var chhsclockOverride = null;
function getCurrentSchedule () {
	var now = new Date();
	
	// is today overridden? check context!
	if ("chhsclockContext" in window) {
		var fd_overrides = chhsclockContext.full_day_overrides;
		for (let i = 0; i < fd_overrides.length; i++) {
			let override = fd_overrides[i];
			for (let j = 0; j < override.applies.length; j++) {
				let currentApplyDate = override.applies[j];
				if (isSameDay(now, currentApplyDate)) {
					overrideIndicator.style.display = "block";
					overrideName.textContent = override.name;
					overrideType.textContent = "full day";
					var applyDateParts = currentApplyDate.split("--");
					if (applyDateParts.length === 1) {
						overrideIndicator.title = "Lasts for the day of " + dashedDateToStr(currentApplyDate);
					} else {
						overrideIndicator.title = "Lasts from " + dashedDateToStr(applyDateParts[0].trim()) + " to " + dashedDateToStr(applyDateParts[1].trim());
					}
					chhsclockOverride = override.name;
					return ((typeof override.schedule === "string") ? schedules[override.schedule] : override.schedule);
				}
			}
		}
	}
	chhsclockOverride = null;
	
	// it's not overridden, follow default behavior:
	var dayOfTheWeek = now.getDay();
	if (dayOfTheWeek === 1) { // if today is Monday
		return schedules.lateStart;
	}
	if ((dayOfTheWeek > 1) && (dayOfTheWeek < 6)) {
		return schedules.regular;
	}
	
	return schedules.none;
}

function getCurrentPeriod () {
	var d = new Date();
	var timePeriods = [];
	
	// is right now overridden? check context!
	if ("chhsclockContext" in window) {
		timePeriods = cloneObj(chhsclockContext.timeframe_overrides);
	}
	
	var currentSchedule = getCurrentSchedule();
	timePeriods.push(...Object.keys(currentSchedule));
	for (let i = 0; i < timePeriods.length; i++) {
		let timePeriod = timePeriods[i];
		let isBasicPeriod = (typeof timePeriod === "string");
		let appliesBlock = (isBasicPeriod ? currentSchedule[timePeriod] : timePeriod.applies);
		for (let j = 0; j < appliesBlock.length; j++) {
			let startTime = appliesBlock[j][0];
			let endTime = appliesBlock[j][1];
			if ((d > startTime) && (d < endTime)) {
				// if we're not first in schedule, show time since start
				if ((i !== 0) && (typeof timePeriods[i-1] === "string")) timeOver.textContent = msToTimeDiff(d - startTime, Math.ceil) + " over";
				else timeOver.textContent = "";
				// if we're not last in schedule, show time until end
				if ((i !== (timePeriods.length - 1)) && (typeof timePeriods[i+1] === "string")) timeLeft.textContent = msToTimeDiff(endTime - d, Math.floor) + " left";
				else timeLeft.textContent = "";
				if (!isBasicPeriod) {
					overrideIndicator.style.display = "block";
					overrideName.textContent = timePeriod.name;
					overrideType.textContent = "timeframe";
					overrideIndicator.title = "Lasts from " + startTime.toLocaleString() + " to " + endTime.toLocaleString();
					chhsclockOverride = timePeriod.name;
				}
				if (!chhsclockOverride) overrideIndicator.style.display = "none";
				return isBasicPeriod ? timePeriod : timePeriod.description;
			}
		}
	}
	timeOver.textContent = "";
	timeLeft.textContent = "";
	if (!chhsclockOverride) overrideIndicator.style.display = "none";
}

function scheduleStrArrToTimeArr (strArr) {
	var objified = [];
	for (let i = 0; i < strArr.length; i++) {
		let parts = strArr[i].split("--");
		objified.push([timeStrToObj(parts[0].trim()), timeStrToObj(parts[1].trim())]);
	}
	return objified;
}
function scheduleStrObjToTimeObj (origSchedule) {
	var schedule = cloneObj(origSchedule);
	var periods = Object.keys(schedule);
	for (let i = 0; i < periods.length; i++) {
		schedule[periods[i]] = scheduleStrArrToTimeArr(schedule[periods[i]]);
	}
	return schedule;
}

// save settings to localStorage
function saveSettings () {
	var constructedSettings = {};
	document.querySelectorAll("[data-setting-name]").forEach(function (e) {
		var settingName = e.getAttribute("data-setting-name");
		if (e.type === "checkbox") {
			constructedSettings[settingName] = e.checked;
			document.body.setAttribute("data-setting-" + settingName, e.checked);
		}
		if ((e.type === "text") || (e.tagName.toUpperCase() === "SELECT")) constructedSettings[settingName] = e.value;
	});
	globalSettings = cloneObj(constructedSettings);
	localStorage.setItem("chhsclockSettings", JSON.stringify(globalSettings));
	reprocessSettings();
}

// cloneObj function taken from https://stackoverflow.com/a/7574273
function cloneObj (obj) {
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
function addObj (original, addme) {
	var combined = cloneObj(original);
	if (typeof addme !== "object") return combined;
	for (var key in addme) {
		if (addme.hasOwnProperty(key)) {
			combined[key] = addme[key];
		}
	}
	return combined;
}

// time functions
function dashedDateToStr (dashedDate) {
	var dateParts = dashedDate.split("-");
	return months[parseInt(dateParts[1] - 1)] + " " + parseInt(dateParts[2]) + ", " + dateParts[0];
}
function isSameDay (t1, t2) {
	var tzOffsetMs = new Date().getTimezoneOffset() * 60000;
	if (typeof t1 === "string") t1 = new Date(Date.parse(t1) + tzOffsetMs);
	else t1 = new Date(t1.toDateString());
	if (typeof t2 === "string") {
		var t2times = t2.split("--");
		if (t2times.length === 1) t2times[1] = t2times[0];
		var t2start = t2times[0];
		var t2end = t2times[1] ? t2times[1] : t2times[0];
		t2start = new Date(Date.parse(t2start.trim()) + tzOffsetMs);
		t2end = new Date(Date.parse(t2end.trim()) + tzOffsetMs);
	} else {
		var t2start = new Date(t2.toDateString());
		var t2end = t2start;
	}
	return (t1 >= t2start) && (t1 <= t2end);
}
// Convert a string to a Date object
function timeStrToObj (time) {
	var now = new Date();
	var date = now.getFullYear() + "-" + (now.getMonth() + 1).toString().padStart(2, "0") + "-" + now.getDate().toString().padStart(2, "0");
	var timeStrParts = time.split("/");
	var parsedTime = time;
	if (timeStrParts.length > 1) {
		date = timeStrParts[0];
		time = timeStrParts[1];
	}
	var ampmSplit = time.split(" ");
	var timeParts = ampmSplit[0].split(":");
	var hours = parseInt(timeParts[0]);
	hours %= 12;
	if (ampmSplit[1].trim() === "PM") {
		hours += 12;
	}
	parsedTime = hours.toString().padStart(2, "0") + ":" + timeParts.slice(1).join(":");
	return new Date(date + "T" + parsedTime);
}
// Convert number of milliseconds to human-readable string
function msToTimeDiff (ms, f) {
	var timeSeconds = (f ? f : Math.round)(ms / 1000);
	var outComponents = [];
	var forceAllNext = false;
	if (forceAllNext || (timeSeconds >= 3600)) {
		outComponents.push(Math.floor(timeSeconds / 3600).toString());
		timeSeconds %= 3600;
		forceAllNext = true;
	}
	if (forceAllNext || (timeSeconds >= 60)) {
		outComponents.push(Math.floor(timeSeconds / 60).toString());
		timeSeconds %= 60;
		forceAllNext = true;
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
// Time formatting function
function ii(i, len) {
	var s = i + "";
	len = len || 2;
	while (s.length < len) s = "0" + s;
	return s;
}
var MMMM = ["\x00", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var MMM = ["\x01", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var dddd = ["\x02", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var ddd = ["\x03", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function getFormattedTime (format) {
	if (!format) {
		format = "h:mm";
	}	
	var date = new Date();

	var y = date.getFullYear();
	format = format.replace(/(^|[^\\])yyyy+/g, "$1" + y);
	// format = format.replace(/(^|[^\\])yy/g, "$1" + y.toString().substr(2, 2));
	// format = format.replace(/(^|[^\\])y/g, "$1" + y);

	var M = date.getMonth() + 1;
	format = format.replace(/(^|[^\\])MMMM+/g, "$1" + MMMM[0]);
	// format = format.replace(/(^|[^\\])MMM/g, "$1" + MMM[0]);
	// format = format.replace(/(^|[^\\])MM/g, "$1" + ii(M));
	// format = format.replace(/(^|[^\\])M/g, "$1" + M);

	var d = date.getDate();
	format = format.replace(/(^|[^\\])dddd+/g, "$1" + dddd[0]);
	// format = format.replace(/(^|[^\\])ddd/g, "$1" + ddd[0]);
	// format = format.replace(/(^|[^\\])dd/g, "$1" + ii(d));
	format = format.replace(/(^|[^\\])d/g, "$1" + d);

	var H = date.getHours();
	// format = format.replace(/(^|[^\\])HH+/g, "$1" + ii(H));
	// format = format.replace(/(^|[^\\])H/g, "$1" + H);

	var h = H > 12 ? H - 12 : H == 0 ? 12 : H;
	// format = format.replace(/(^|[^\\])hh+/g, "$1" + ii(h));
	format = format.replace(/(^|[^\\])h/g, "$1" + h);

	var m = date.getMinutes();
	format = format.replace(/(^|[^\\])mm+/g, "$1" + ii(m));
	// format = format.replace(/(^|[^\\])m/g, "$1" + m);

	var s = date.getSeconds();
	// format = format.replace(/(^|[^\\])ss+/g, "$1" + ii(s));
	// format = format.replace(/(^|[^\\])s/g, "$1" + s);

	var T = H < 12 ? "AM" : "PM";
	// format = format.replace(/(^|[^\\])TT+/g, "$1" + T);
	// format = format.replace(/(^|[^\\])T/g, "$1" + T.charAt(0));

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
