var problem = require(__dirname + '/../problems/18.7-longest_combo_word.js').problem

problem.sets.forEach(solve)

function solve(set, testIdx) {
	console.log('Solving: ' + JSON.stringify(set))
	var result = findLongest(set)
	problem.check(testIdx, result)
}

function findLongest(set) {

	// Sort strings by length, descending
	set.sort(function(a, b){
		return b.length - a.length
	})

	// Iterate through each word, then compare them to all others
	var allComboWords = []
	set.forEach(function(item) {
		var thisWord = isComboWord(item, set, true)
		if (thisWord) {
			allComboWords.push(item)
		}
	})

	return allComboWords[0]
}

/**
 * Iterate through each character in item.
 * As we compare and can build the left, check the remainder of the string recursively
 */
function isComboWord(item, set, isOriginal) {
	if (!isOriginal && setContains(set, item))
		return true

	for (var i = 1, iLen = item.length; i < iLen; i++) {
		var left = item.substring(0, i)
		var right = item.substring(i)

		if (setContains(set, left) && isComboWord(right, set, false)) {
			return true
		}
	}

	return false
}

/**
 * Checks if our set contains the needle
 */
function setContains(haystack, needle) {
	return haystack.indexOf(needle) !== -1
}
