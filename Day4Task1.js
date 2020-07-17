let onDuty = null;
let sleptAt = null;
let sleptMinutes = new Map();
let commonMinutes = new Map();

function wake(minute) {
	if (sleptAt != null) {
		for (let i = sleptAt; i < minute; i++) {
			if (sleptMinutes.has(onDuty)) {
				sleptMinutes.set(onDuty, sleptMinutes.get(onDuty)+1);
			} else {
				sleptMinutes.set(onDuty, 1);
			}
			let hash = String([onDuty,i]);
			if (commonMinutes.has(hash)) {
				commonMinutes.set(hash, commonMinutes.get(hash)+1);
			} else {
				commonMinutes.set(hash, 1);
			}
		}
	}
	sleptAt = null;
}

function sleep(minute) {
	if (sleptAt == null) {
		sleptAt = minute;
	}
}

function updateState(string) {
	let [date, time, first, second] = string.split(' ');
	let [hours, minutes] = time.split(":");
	let minute = parseInt(minutes);
	if (first == "Guard") {
		// console.log(`Guard ${second} on duty`);
		wake(60);
		onDuty = second;
	} else if (first == "falls") {
		// console.log(`Sleep at ${minute}`);
		sleep(minute);
	} else if (first == "wakes") {
		// console.log(`Wake at ${minute}`);
		wake(minute);
	} else {
		console.log("Unexpected word: " + first);
	}
}

const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});

let lines = [];

rl.on('line', function(line) {
	lines.push(line);
});
rl.on('close', function() {
	lines.sort();
	for (let line of lines) {
		updateState(line);
	}
	let sleepiestGuard = null;
	let sleepiestTime = 0;
	for (let [guard, time] of sleptMinutes) {
		if (time > sleepiestTime) {
			sleepiestGuard = guard;
			sleepiestTime = time;
		}
	}
	let sleepiestMinute = null;
	let sleepiestTimes = 0;
	for (let i = 0; i < 60; i++) {
		let hash = String([sleepiestGuard, i]);
		let times = commonMinutes.get(hash);
		if (times > sleepiestTimes) {
			sleepiestMinute = i;
			sleepiestTimes = times;
		}
	}
	console.log(sleepiestGuard + " " + sleepiestMinute);
});
