var problem = require(__dirname + '/../problems/spiral_print.js').problem

problem.sets.forEach(solve)

function solve(set, testIdx) {
	console.log('Solving: ' + set)
	var result = spiralPrint(set)
	problem.check(testIdx, result)
}

function addTop(set, result) {
	set.shift().forEach(function(item, idx) {
		result.push(item)
	})
}

function addRight(set, result) {
	set.forEach(function(row, idx) {
		result.push(row.pop())
	})
}

function addBottom(set, result) {
	var last = set.pop()
	for (var i = last.length-1; i >= 0; i--) {
		result.push(last[i])
	}
}

function addLeft(set, result) {
	for (var i = set.length-1; i >= 0; i--) {
		result.push(set[i].shift())
	}
}

function spiralPrint(set) {
	var result = []

	while(true) {
		try {
			addTop(set, result)
			addRight(set, result)
			addBottom(set, result)
			addLeft(set, result)
		} catch(e) {
			break
		}
	}

	return result
}
