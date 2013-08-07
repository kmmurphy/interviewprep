var problem = require(__dirname + '/../problems/1.3-is_permutation.js').problem

problem.sets.forEach(solve)

function solve(set, testIdx) {
	console.log('Solving: ' + JSON.stringify(set))
	var result = checkPermutation(set)
	problem.check(testIdx, result)
}

function makeHash(nums) {
	var hash = {}
	nums.split('').forEach(function(letter) {
		if (!hash[letter])
			hash[letter] = 0
		hash[letter]++
	})
	return hash
}

/**
 * Poor man's equal
 */
function testEqual(obj1, obj2) {
	if (Object.keys(obj1).length !== Object.keys(obj2).length)
		return false

	for (var i in obj1) {
		if (!obj2[i] || obj1[i] !== obj2[i])
			return false
	}

	return true
}

function checkPermutation(set) {

	var hash1 = makeHash(set[0])
	var hash2 = makeHash(set[1])

	// Poor mans equal
	return testEqual(hash1, hash2)
}
