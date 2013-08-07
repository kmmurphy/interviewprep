var problem = require(__dirname + '/../problems/integer_tuple_sum.js').problem

problem.sets.forEach(solve)

function solve(set, testIdx) {
	console.log('Solving: ' + JSON.stringify(set))
	var result = findPairs(set.sum, set.nums)
	problem.check(testIdx, result)
}

function findPairs(sum, nums) {
	var pairs = []

	var hash = {}

	for (var i = 0, iLen = nums.length; i < iLen; i++) {
		var num = nums[i]

		var diff = sum - num
		if (hash[diff]) {
			pairs.push([num, diff])
		} else {
			hash[num] = []
		}
	}

	return pairs
}
