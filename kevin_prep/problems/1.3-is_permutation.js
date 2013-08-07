var problem = new (require('./problem.js')).Problem()

problem.describe('Given two strings, write a method to decide if one is a permutation of the other.')

var data = {
	sets: [
		['bbq', 'wtf'],
		['dog', 'god'],
		['dog', 'dog'],
		['algorithm', 'logarithm'],
		['bb', 'bbb'],
	],
	solutions: [
		false,
		true,
		true,
		true,
		false
	]
}

problem.setData(data.sets, data.solutions)
exports.problem = problem

