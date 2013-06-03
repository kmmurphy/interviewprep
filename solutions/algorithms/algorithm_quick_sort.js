
// create the array to sort
var arr = createArrayToSort(1000, 0, 10000)

// create a sorted version of the array for validation
var validationArr = [].concat(arr).sort(function (a, b){ return a - b })

// sort the array
var sortedArr = quickSort([].concat(arr))

// compare the native and custom sorts
try {
  compareArrays(validationArr, sortedArr)
  console.log("THE ARRAYS MATCHED!")
} catch (e) {
  console.error(e.message)
}

/**
 * Sort an array w/ merge sort
 *
 * @param  {Array.<number>} sortArr the array to sort
 * @return {Array.<number>} returns the array to be sorted
 */
function quickSort(sortArr, start, end) {
  if (typeof end == 'undefined') {
    start = 0
    end = sortArr.length - 1
  }
  if (start >= end) return sortArr

  // pick an initial pivot
  var pivotIdx = Math.floor((end - start) / 2) + start
  var pivotVal = sortArr[pivotIdx]

  // move the pivot val to the very end
  swapVals(sortArr, pivotIdx, end)
  pivotIdx = start

  // shift everything up to the pivot idx
  for (var i = start; i < end; i++) {
    if (sortArr[i] <= pivotVal) {
      swapVals(sortArr, i, pivotIdx)
      pivotIdx++
    }
  }

  // move the pivot to the actual pivot idx
  swapVals(sortArr, end, pivotIdx)
  quickSort(sortArr, start, pivotIdx - 1)
  quickSort(sortArr, pivotIdx + 1, end)

  return sortArr
}

/**
 * Utility function for swapping two array elements
 * @param  {Array.<number>} sortArr the array
 * @param  {number} idx1    the first index
 * @param  {number} idx2    the second index
 */
function swapVals(sortArr, idx1, idx2) {
  var temp = sortArr[idx1]
  sortArr[idx1] = sortArr[idx2]
  sortArr[idx2] = temp
}

/**
 * Compare 2 arrays and make sure each element matches
 *
 * @param  {Array.<number>} arr1 the first array
 * @param  {Array.<number>} arr2 the second array
 */
function compareArrays(arr1, arr2) {
  if (arr1.length != arr2.length) throw new Error("The array lengths did not match")
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] != arr2[i]) throw new Error("The arrays did not match at " + i)
  }
}

/**
 * Create an array of numbers to sort
 *
 * @param  {number} length the number of items to insert into the array
 * @param  {number} min    the minimium value for each item
 * @param  {number} max    the maximum value for each item (non-inclusive)
 * @return {Array.<number>} The array of numbers
 */
function createArrayToSort(length, min, max) {
  var rangeSize = max - min
  var items = []
  for (var i = 0; i < length; i++) {
    items.push(Math.floor(Math.random() * rangeSize) + min)
  }
  return items
}