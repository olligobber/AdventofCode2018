let inEdges = new Map();
let outEdges = new Map();
let noEdges = [];

function addEdge(from, to) {
	if (inEdges.has(to)) {
		inEdges.set(to, inEdges.get(to)+1);
	} else {
		inEdges.set(to, 1);
	}
	if (inEdges.has(from)) {
		// nothing to do
	} else {
		inEdges.set(from, 0);
	}
	if (outEdges.has(to)) {
		// nothing to do
	} else {
		outEdges.set(to, []);
	}
	if (outEdges.has(from)) {
		outEdges.get(from).push(to);
	} else {
		outEdges.set(from, [to]);
	}
}

function removeVertex(v) {
	for (let other of outEdges.get(v)) {
		let newIn = inEdges.get(other) - 1;
		inEdges.set(other, newIn);
		if (newIn == 0) {
			noEdges.push(other);
		}
	}
}

function getRunTime(v) {
	return (61 + "ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(v));
}

const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});

rl.on('line', function(line) {
	let earlier = line.split(" ")[1];
	let later = line.split(" ")[7];
	addEdge(earlier,later);
});

rl.on('close', function() {
	for (let [vertex,degree] of inEdges) {
		if (degree == 0) {
			noEdges.push(vertex);
		}
	}
	let runTime = 0;
	let waiting = [];
	while (noEdges.length != 0 || waiting.length != 0) {
		// console.log(`tick ${runTime}`);
		// tick all in-progress tasks
		waiting = waiting.map(({v,t}) => {return {v, t:t-1};});
		// remove tasks with no time left
		waiting = waiting.filter(({v,t}) => {
			if (t == 0) {
				// console.log(`Finished task ${v}`);
				removeVertex(v);
				return false;
			}
			return true;
		});
		// fill empty slots
		while (waiting.length < 5 && noEdges.length != 0) {
			noEdges.sort();
			let nextVertex = noEdges.shift();
			// console.log(`Started task ${nextVertex}`);
			waiting.push({v : nextVertex, t : getRunTime(nextVertex)});
		}
		// increment run time
		runTime++;
	}
	console.log(runTime-1);
});
