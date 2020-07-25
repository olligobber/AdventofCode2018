let minX = Infinity;
let minY = Infinity;
let maxX = -Infinity;
let maxY = -Infinity;
let areaCounts = new Map();

const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});

rl.on('line', function(line) {
	let [x,y] = line.split(", ");
	areaCounts.set({ x : +x,y : +y }, 0);
	minX = Math.min(+x, minX);
	minY = Math.min(+y, minY);
	maxX = Math.max(+x, maxX);
	maxY = Math.max(+y, maxY);
});

// Return null if tie
function closestKey(x, y) {
	let minDistance = Infinity;
	let minKey = null;
	for (let k of areaCounts.keys()) {
		let distance = Math.abs(x - k.x) + Math.abs(y - k.y);
		if (distance == minDistance) {
			minKey = null;
		} else if (distance < minDistance) {
			minDistance = distance;
			minKey = k;
		}
	}
	return minKey;
}

function setBoundary(x, y) {
	let k = closestKey(x,y);
	if (k != null) {
		areaCounts.set(k, Infinity);
	}
}

function setInterior(x, y) {
	let k = closestKey(x,y);
	if (k != null) {
		let c = areaCounts.get(k);
		areaCounts.set(k, c+1);
	}
}

rl.on('close', function() {
	for (let x = minX; x <= maxX; x++) {
		setBoundary(x, minY);
		setBoundary(x, maxY);
	}
	for (let y = minY; y <= maxY; y++) {
		setBoundary(minX, y);
		setBoundary(maxX, y);
	}
	for (let x = minX+1; x < maxX; x++) {
		for (let y = minY+1; y < maxY; y++) {
			setInterior(x,y);
		}
	}
	let maxArea = 0;
	for (let [k,v] of areaCounts) {
		if (v < Infinity) {
			maxArea = Math.max(maxArea, v);
		}
	}
	console.log(maxArea);
});
