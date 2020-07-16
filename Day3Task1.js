function processClaim(string, onInch) {
	let [name,at,coords,size] = string.split(' ');
	let [lefts,tops] = coords.split(',');
	let left = parseInt(lefts);
	let top = parseInt(tops);
	let [widths,heights] = size.split('x');
	let width = parseInt(widths);
	let height = parseInt(heights);
	// console.log(`Claim at ${left},${top}: ${width}x${height}`);
	for (let i=0; i<width; i++) {
		for (let j=0; j<height; j++) {
			onInch(left+i,top+j);
		}
	}
}

let doubleClaim = new Set();
let singleClaim = new Set();

function claim(x,y) {
	// console.log(`Claimed: ${x},${y}`);
	let hash = String([x,y]);
	if (doubleClaim.has(hash)) {
		// console.log("More than double");
	} else if (singleClaim.has(hash)) {
		// console.log("Double");
		doubleClaim.add(hash);
		singleClaim.delete(hash);
	} else {
		// console.log("Single");
		singleClaim.add(hash);
	}
}

const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});

rl.on('line', function(line) {
	processClaim(line, claim);
});
rl.on('close', function() {
	console.log(doubleClaim.size);
});
