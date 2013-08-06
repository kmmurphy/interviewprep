var problem = require(__dirname + '/../problems/merge_sort.js').problem

problem.sets.forEach(solve)

function solve(set, testIdx) {
	console.log('Solving: ' + set)
	var sorted = radixSort(set)
	problem.check(testIdx, sorted)
}


function reverse(s){
	return (s+"").split("").reverse().join("")
}

function radixSort(set, digit) {

	digit = digit || 0

	var sorted = []
	var map = []

	var longestString = 0

	for (var i = 0, val; val = set[i]; i++) {

		if ((val+'').length > longestString)
			longestString = (val+'').length

		var thisDigit
		if ((val+'').length <= digit) {
			thisDigit = '0'
		} else {
			thisDigit = reverse(val)[digit]
		}

		if (!map[thisDigit])
			map[thisDigit] = []

		map[thisDigit].push(val)
	}

	if (digit >= longestString)
		return set

	map.forEach(function(eachMap) {
		sorted = sorted.concat(eachMap)
	})

	sorted = radixSort(sorted, ++digit)

	return sorted
}
