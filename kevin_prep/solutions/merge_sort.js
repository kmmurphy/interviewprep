var problem = require(__dirname + '/../problems/merge_sort.js').problem
problem.sets.forEach(solve)

function solve(set, testIdx) {
	console.log('Solving: ' + set)

	var sorted = optimizedMergeSort(set)
	problem.check(testIdx, sorted)
}

function merge(left, right) {
	var result = []
	var iLeft = 0
	var iRight = 0

	while (iLeft < left.length && iRight < right.length){
		if (left[iLeft] < right[iRight])
			result.push(left[iLeft++])
		else
			result.push(right[iRight++])
	}

	return result.concat(left.slice(iLeft)).concat(right.slice(iRight))
}

function optimizedMergeSort(arr) {
	if (arr.length === 1)
		return arr

 	var mid = Math.floor(arr.length / 2)
	var left = arr.slice(0, mid)
	var right = arr.slice(mid)

    return merge(optimizedMergeSort(left), optimizedMergeSort(right));
}

function originalMergeSolution(arr) {
	if (arr.length === 1) {
		return arr
	}

	var mid = Math.floor(arr.length / 2)
	var arr1 = arr.slice(0, mid)
	var arr2 = arr.slice(mid)

	arr1 = originalMergeSolution(arr1)
	arr2 = originalMergeSolution(arr2)

	var arr3 = []

	while(true) {
		if (!arr1[0] || !arr2[0])
			break

		if (arr1[0] < arr2[0])
			arr3.push(arr1.shift())
		else
			arr3.push(arr2.shift())
	}

	if (arr1.length)
		arr3 = arr3.concat(arr1)
	if (arr2.length)
		arr3 = arr3.concat(arr2)

	return arr3
}
