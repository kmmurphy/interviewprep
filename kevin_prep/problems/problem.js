var red   = '\033[31m'
var blue  = '\033[34m'
var green  = '\033[32m'
var reset = '\033[0m'

function Problem() {
	this.sets = []
	this.solutions = []
}

Problem.prototype = {

	setData: function(sets, solutions) {
		this.sets = sets
		this.solutions = solutions
	},

	describe: function(description) {
		console.log(description)
		console.log('-----------------------------------------')
	},

	check: function(idx, solution) {
		if (JSON.stringify(solution) === JSON.stringify(this.solutions[idx])) {
			console.log('Test ' + idx + ' ' + green + 'success!' + reset)
		} else {
			console.log('Test ' + idx + ' ' + red + 'failure =(' + reset)
		}
		console.log('Expected: ', JSON.stringify(this.solutions[idx]))
		console.log('Received: ', JSON.stringify(solution))
		console.log('-----------------------------------------')
	}
}

exports.Problem = Problem
