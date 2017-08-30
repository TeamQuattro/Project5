console.log("hello");

function clock () {
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
		return (`${minutes} : ${seconds} : ${milliseconds}`);
	}

	this.started = false;
	this.start = () => {
		if (!this.started) {
			interval = setInterval(update, 100);
			offset = Date.now();
			this.started = true;
		}
	};
	this.stop = () => {
		if(this.started) {
			clearInterval(interval);
			interval = null;
			this.started = false;
		}
	};
	this.reset = () => {
		time = 0;
	};
}

let watch = new clock();
watch.start();

