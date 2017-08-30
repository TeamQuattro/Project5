"use strict";

console.log("hello");

function clock() {
	var _this = this;

	var time = 0;
	var offset;
	var interval;

	function update() {
		time += delta();
		var timeFormatted = timeInMilliseconds(time);
	}
	function delta() {
		var now = Date.now();
		var timePassed = offset - now;
		return timePassed;
	}
	function timeFormat(timeInMilliseconds) {
		var time = new Date(timeInMilliseconds);
		var minutes = time.getMinutes().toString();
		var seconds = time.getSeconds().toString;
		var milliseconds = time.getMilliseconds().toString;
		if (minutes < 2) {
			minutes = "0" + minutes;
		}
		if (seconds < 2) {
			seconds = "0" + seconds;
		}
		if (milliseconds < 3) {
			milliseconds = "0" + milliseconds;
		}
		return minutes + " : " + seconds + " : " + milliseconds;
	}

	this.started = false;
	this.start = function () {
		if (!_this.started) {
			interval = setInterval(update, 100);
			offset = Date.now();
			_this.started = true;
		}
	};
	this.stop = function () {
		if (_this.started) {
			clearInterval(interval);
			interval = null;
			_this.started = false;
		}
	};
	this.reset = function () {
		time = 0;
	};
}

var watch = new clock();
watch.start();