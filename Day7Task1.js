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
	let order = [];
	while (noEdges.length != 0) {
		noEdges.sort();
		let removedVertex = noEdges.shift();
		removeVertex(removedVertex);
		order.push(removedVertex);
	}
	console.log(order.join(""));
});
