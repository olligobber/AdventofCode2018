// Does the string contain a character exactly a number of times
function hasRepeats(string, number) {
	let seen = 0;
	let sorted = Array.from(string).sort();
	let lastSeen = null;
	for (let char of sorted) {
		if (char === lastSeen) {
			seen++;
		} else {
			if (seen == number) {
				return true;
			}
			lastSeen = char;
			seen = 1;
		}
	}
	return seen==number;
}

const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});

let twos = 0;
let threes = 0;
rl.on('line', function(line) {
	if (hasRepeats(line,2)) {
		twos++;
	}
	if (hasRepeats(line,3)) {
		threes++;
	}
});
rl.on('close', function() {
	console.log(twos*threes);
});
