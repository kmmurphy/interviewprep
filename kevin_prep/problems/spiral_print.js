var problem = new (require('./problem.js')).Problem()

problem.describe('Given a 3d array of numbers, output the numbers in a spiral. E.g., print from the top left to top right, to bottom right, to bottom left, and back up. You should print all numbers in the order, and not print any number twice.')

var data = {
	sets: [
		[
		[3,3,3,4,4],
		[1,1,2,2,3],
		[4,5,6,6,6],
		[7,7,7,8,8],
		[9,9,0,0,0]
		],
		[
		[3,3,3,4,4,8],
		[1,1,2,2,3,8],
		[4,5,6,6,6,8],
		[7,7,7,8,8,8],
		[9,9,0,0,0,8],
		[2,2,2,1,1,0]
		],
	],
	solutions: [
		[3,3,3,4,4,3,6,8,0,0,0,9,9,7,4,1,1,2,2,6,8,7,7,5,6],
		[3,3,3,4,4,8,8,8,8,8,0,1,1,2,2,2,9,7,4,1,1,2,2,3,6,8,0,0,0,9,7,5,6,6,8,7]
	]
}

problem.setData(data.sets, data.solutions)
exports.problem = problem
