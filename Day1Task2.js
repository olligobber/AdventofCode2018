const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});
let lines = new Array();
rl.on('line', function(line) {
	lines.push(+line);
});
rl.on('close', function() {
	let total = 0;
	let totals = new Set();
	let i = 0;
	while (!totals.has(total)) {
		totals.add(total);
		total += lines[i];
		i = (i+1) % lines.length;
	}
	console.log(total);
});
