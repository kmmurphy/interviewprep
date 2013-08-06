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
			console.log('Test ' + idx + ' success!')
		} else {
			console.log('Test ' + idx + ' failure =(')
		}
		console.log('Expected: ', JSON.stringify(this.solutions[idx]))
		console.log('Received: ', JSON.stringify(solution))
		console.log('-----------------------------------------')
	}
}

exports.Problem = Problem
