var problem = new (require('./problem.js')).Problem()

problem.describe('Implement an algorithm to determine if a string has all unique characters.')

var data = {
	sets: [
		'omfgwtfbbq',
		'abcdefghijklmnopqrstuvwxyz',
	],
	solutions: [
		false,
		true
	]
}

problem.setData(data.sets, data.solutions)
exports.problem = problem
