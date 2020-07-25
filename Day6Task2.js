let minX = Infinity;
let minY = Infinity;
let maxX = -Infinity;
let maxY = -Infinity;
let centers = [];

const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});

rl.on('line', function(line) {
	let [x,y] = line.split(", ");
	centers.push({ x : +x,y : +y });
	minX = Math.min(+x, minX);
	minY = Math.min(+y, minY);
	maxX = Math.max(+x, maxX);
	maxY = Math.max(+y, maxY);
});

function distanceKeys(x, y) {
	let total = 0;
	for (let k of centers) {
		let distance = Math.abs(x - k.x) + Math.abs(y - k.y);
		total += distance;
	}
	return total;
}

rl.on('close', function() {
	let spots = 0;
	for (let x = minX-20; x <= maxX+20; x++) {
		for (let y = minY-20; y <= maxY+20; y++) {
			if (distanceKeys(x,y) < 10000) {
				spots++;
			}
		}
	}
	console.log(spots);
});
