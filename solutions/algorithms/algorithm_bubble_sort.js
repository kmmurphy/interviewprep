
// create the array to sort
var arr = createArrayToSort(1000, 0, 10000)

// create a sorted version of the array for validation
var validationArr = [].concat(arr).sort(function (a, b){ return a - b })

// sort the array
var sortedArr = bubbleSort([].concat(arr))

// compare the native and custom sorts
compareArrays(validationArr, sortedArr)

// done
console.log("THE ARRAYS MATCHED!")

/**
 * Sort an array w/ bubble sort
 * @param  {Array.<number>} sortArr the array to sort
 * @return {Array.<number>} returns the array to be sorted
 */
function bubbleSort(sortArr) {
  var swapped
  do {
    swapped = false
    for (var i = 0; i < sortArr.length - 1; i++) {
      if (sortArr[i] > sortArr[i + 1]) {
        swapped = true
        var temp = sortArr[i]
        sortArr[i] = sortArr[i + 1]
        sortArr[i + 1] = temp
      }
    }
  } while (swapped)

  return sortArr
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