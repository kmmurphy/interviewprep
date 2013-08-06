var problem = new (require('./problem.js')).Problem()
var sortData = require('./data/sort.js')

problem.describe('Quicksort is a divide and conquer algorithm. Quicksort first divides a large list into two smaller sub-lists: the low elements and the high elements. Quicksort can then recursively sort the sub-lists.\n\
The steps are:\n\
Pick an element, called a pivot, from the list.\n\
Reorder the list so that all elements with values less than the pivot come before the pivot, while all elements with values greater than the pivot come after it (equal values can go either way).\n\
After this partitioning, the pivot is in its final position. This is called the partition operation.\n\
Recursively apply the above steps to the sub-list of elements with smaller values and separately the sub-list of elements with greater values.\n\
The base case of the recursion are lists of size zero or one, which never need to be sorted.')

problem.setData(sortData.sets, sortData.solutions)
exports.problem = problem
