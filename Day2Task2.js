function differByOne(a,b) {
	if (a.length != b.length) {
		return false;
	}
	differs = 0;
	for (let i=0; i<a.length; i++) {
		if (a[i] != b[i]) {
			differs++;
			if (differs > 1) {
				return false;
			}
		}
	}
	return (differs == 1);
}

const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});

let seen = [];
rl.on('line', function(line) {
	for (let other of seen) {
		if (differByOne(line, other)) {
			console.log(line);
			console.log(other);
		}
	}
	seen.push(line);
});
