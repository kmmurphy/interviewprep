var problem = require(__dirname + '/../problems/quick_sort.js').problem

problem.sets.forEach(solve)

function solve(set, testIdx) {
	console.log('Solving: ' + set)
	//var sorted = quickSort(set)
	var sorted = inPlaceQS(set, 0, set.length-1)
	problem.check(testIdx, sorted)
}

function swap(set, idx1, idx2) {
	var tmp = set[idx2]
	set[idx2] = set[idx1]
	set[idx1] = tmp
}

function inPlaceQS(set, left, right) {

	if (set.length < 2 || left > right)
		return set

	var pivot = left + Math.ceil((right - left) / 2)
	var pivotVal = set[pivot]

	// Put pivot at the end
	swap(set, pivot, right)

	// Iterate through array, place lower values to left of pivot
	var counter = left
	for (var i = left; i < right; i++) {
		if (set[i] < pivotVal)
			swap(set, i, counter++)
	}

	// Insert pivot in correct place
	swap(set, right, counter)

	inPlaceQS(set, left, counter - 1)
	inPlaceQS(set, counter + 1, right)

	return set
}

function quickSort(set) {

	if (set.length < 2)
		return set

	var pivot = Math.floor(set.length / 2)
	var pivotVal = set[pivot]

	// Make a new array [<Items less than pivot>, <pivot>, <Items >= than pivot>]
	var lessThan = []
	var greaterThan = []

	for ( var i = 0; i < set.length; i++) {
		if (i == pivot) continue

		if (set[i] < pivotVal) {
			lessThan.push(set[i])
		} else {
			greaterThan.push(set[i])
		}
	}

	return quickSort(lessThan).concat([pivotVal]).concat(quickSort(greaterThan))
}
