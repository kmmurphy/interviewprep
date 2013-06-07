
// create the array to sort
var arr = createArrayToSort(1000, 0, 10000)

// create a sorted version of the array for validation
var validationArr = [].concat(arr).sort(function (a, b){ return a - b })

// sort the array
var sortedArr = radixSort([].concat(arr))

// compare the native and custom sorts
try {
  compareArrays(validationArr, sortedArr)
  console.log("THE ARRAYS MATCHED!")
} catch (e) {
  console.error(e.message)
}

/**
 * Sort an array w/ radix sort
 * @param {Array.<number>} sortArr the array to sort
 * @param {number} currentDigit the current digit to sort by
 * @param {number} totalDigits the total number of digits for the largest value
 * @return {Array.<number>} returns the array to be sorted
 */
function radixSort(sortArr, currentDigit, totalDigits) {
  var i

  if (!totalDigits) {
    var upperBound = 10
    currentDigit = 1
    totalDigits = 1
    for (i = 0; i < sortArr.length; i++) {
      while (Math.abs(sortArr[i]) >= upperBound) {
        totalDigits++
        upperBound *= 10
      }
    }
  }
  if (currentDigit > totalDigits) return sortArr

  // set up the buckets
  var buckets = []
  for (i = 0; i < 10; i++) {
    buckets.push([])
  }

  // set up the lower and upper bounds
  var lowerBound = Math.pow(10, currentDigit - 1)

  // split the numbers into buckets
  for (i = 0; i < sortArr.length; i++) {
    var val = sortArr[i]
    var bucketIdx = Math.floor(val / lowerBound) % 10
    buckets[bucketIdx].push(val)
  }

  // rejoin the buckets
  var newArr = []
  for (i = 0; i < 10; i++) {
    for (j = 0; j < buckets[i].length; j++) {
      newArr.push(buckets[i][j])
    }
  }

  return radixSort(newArr, currentDigit + 1, totalDigits)
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
    if (arr1[i] != arr2[i]) throw new Error("The arrays did not match")
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