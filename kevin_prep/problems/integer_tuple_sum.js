var problem = new (require('./problem.js')).Problem()

problem.describe('For a given constant N, find all pairs within an unordered array whose sum is equal to N.')

var data = {
	sets: [
		{sum: 10, nums: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]},
		{sum: 50, nums: [25, 25, 20, 30, 10, 5, 2, 40, 51, 45, 3, 1, 15, 35]}
	],
	solutions: [
		[[1, 9], [2, 8], [3, 7], [4, 6]],
		[[25, 25], [30, 20], [40, 10], [45, 5], [35, 15]]
	]
}

problem.setData(data.sets, data.solutions)
exports.problem = problem
