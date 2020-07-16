const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});
let total = 0;
rl.on('line', function(line) {
	total += Number(line);
});
rl.on('close', function() {
	console.log(total);
});
