// error handler for safety
window.onerror = function(e) { alert("ERROR: " + e); };

// do forever
function clockwork() {
	timeDisplay.textContent = getFormattedTime();//.split(":").join('<span class="timeColon">:</span>');
	currentTimePeriod.textContent = getCurrentPeriod();
	requestAnimationFrame(clockwork);
}

// page is loaded and ready to go
function ready() {
	document.querySelectorAll("[id]").forEach(function(e) { window[e.id] = e; });
	requestAnimationFrame(clockwork);
}

window.addEventListener("load", ready);

function timeStrToObj(time) {
	return new Date(Date.parse(time + getFormattedTime(", MMMM d, yyyy")));
}

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

function getCurrentPeriod() {
	var d = new Date();
	var timePeriods = Object.keys(regularSchedule);
	var i;
	for(i = 0; i < timePeriods.length; i++) {
		let timePeriod = timePeriods[i];
		let j = 0;
		for(j = 0; j < regularSchedule[timePeriod].length; j++) {
			let timeBlock = regularSchedule[timePeriod][j].split("-");
			if ((d > timeStrToObj(timeBlock[0].trim())) && (d < timeStrToObj(timeBlock[1].trim()))) {
				return timePeriod;
			}
		}
	}
}

function getFormattedTime(format) {
	if(!format) {
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