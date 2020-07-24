function isReact(a, b) {
	if (a.toUpperCase() != b.toUpperCase()) {
		return false;
	}
	if (a == b) {
		return false;
	}
	return true;
}

function react(string) {
	for (let i = 0; i < string.length-1;) {
		if (isReact(string[i], string[i+1])) {
			string = string.slice(0,i) + string.slice(i+2);
			i--;
			if (i<0) {
				i=0;
			}
		} else {
			i++;
		}
	}
	return string;
}

function filterLetter(letter, string) {
	return Array.from(string).filter(
		(x) => (x != letter.toUpperCase() && x != letter.toLowerCase())
	).join("");
}

const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});

rl.on('line', function(line) {
	let minimum = Infinity;
	for (let letter of "abcdefghijklmnopqrstuvwxyz") {
		minimum = Math.min(minimum,react(filterLetter(letter,line)).length);
	}
	console.log(minimum);
});
