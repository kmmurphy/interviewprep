var problem = new (require('./problem.js')).Problem()

problem.describe('Given a list of words, write a program to find the longest word made of other words in the list.')

var data = {
	sets: [
		['i', 'b', 'ib'],
		['omg', 'wtf', 'bbq', 'omgbbq'],
		['omfg', 'wtf', 'bbq', 'wtfbbq', 'sauce', 'omfgwtfbbqsauce', 'omfgwtfbbqsauced']
	],
	solutions: [
		'ib',
		'omgbbq',
		'omfgwtfbbqsauce'
	]
}

problem.setData(data.sets, data.solutions)
exports.problem = problem
