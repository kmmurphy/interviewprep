var problem = new (require('./problem.js')).Problem()
var sortData = require('./data/sort.js')

problem.describe('Conceptually, a merge sort works as follows\n\
Divide the unsorted list into n sublists, each containing 1 element (a list of 1 element is considered sorted).\n\
Repeatedly merge sublists to produce new sublists until there is only 1 sublist remaining. This will be the sorted list.')

problem.setData(sortData.sets, sortData.solutions)
exports.problem = problem
