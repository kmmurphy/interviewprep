var problem = require(__dirname + '/../problems/1.1-unique_chars.js').problem

problem.sets.forEach(solve)

function solve(set, testIdx) {
	console.log('Solving: ' + JSON.stringify(set))
	var result = checkDuplicates(set)
	problem.check(testIdx, result)
}

function checkDuplicates(str) {
	var hash = {}

	for (var i = 0, iLen = str.length; i < iLen; i++) {
		if (hash[str[i]])
			return false
		hash[str[i]] = true
	}

	return true
}
