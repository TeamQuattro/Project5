"use strict";

<<<<<<< HEAD
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
=======
// Stopwatch by Cathy Dutton 
// https://codepen.io/cathydutton/pen/GBcvo

window.onload = function () {

  var seconds = 0;
  var tens = 0;
  var appendTens = document.getElementById("tens");
  var appendSeconds = document.getElementById("seconds");
  var buttonStart = document.getElementById('button-start');
  var buttonStop = document.getElementById('button-stop');
  var buttonReset = document.getElementById('button-reset');
  var Interval;

  buttonStart.onclick = function () {
    clearInterval(Interval);
    Interval = setInterval(startTimer, 10);
  };

  buttonStop.onclick = function () {
    clearInterval(Interval);
    console.log(seconds);
    var totalTime = seconds;
  };

  buttonReset.onclick = function () {
    clearInterval(Interval);
    tens = "00";
    seconds = "00";
    appendTens.innerHTML = tens;
    appendSeconds.innerHTML = seconds;
  };

  function startTimer() {
    tens++;

    if (tens < 9) {
      appendTens.innerHTML = "0" + tens;
    }

    if (tens > 9) {
      appendTens.innerHTML = tens;
    }

    if (tens > 99) {
      console.log("seconds");
      seconds++;
      appendSeconds.innerHTML = "0" + seconds;
      tens = 0;
      appendTens.innerHTML = "0" + 0;
    }

    if (seconds > 9) {
      appendSeconds.innerHTML = seconds;
    }
  }
};
>>>>>>> 90702ed36fcacb0268aa8fb9e72e927f1f80a6f3
