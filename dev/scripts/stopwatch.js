function stopwatch () {
	var time = 0;
	var offset;
	var interval;

	function update() {};
	function delta() {};
	function timeFormat() {};

	this.started = false;
	this.start = () => {
		if (!this.started) {
			interval = setInterval(update, 100);
			offset = Date.now();
			this.started = true;
		}
	};
	this.stop = () => {

	};
	this.reset() {

	};
}

let watch = new stopwatch();
watch.start();

