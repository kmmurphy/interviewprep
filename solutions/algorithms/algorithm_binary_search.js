
// create the array to sort
var arr = createSortedArray(1000, 0, 10000)

for (var i = 0; i < 100; i++) {
  // pick a random index from the array (and find the minimum key with the same value)
  var idx = getLowestEqualIndex(arr, Math.floor(Math.random() * arr.length))

  // binary search for the value that the index maps to
  var searchIdx = getLowestEqualIndex(arr, binarySearch(arr, arr[idx]))
  if (searchIdx != idx) throw new Error("Unable to find an index")
}
console.log("FOUND ALL EXPECTED VALUES")

for (var j = 0; j < 100; j++) {
  // create a random number in the range that's not in the array (costly this way, but whatevs)
  var val = -1
  do {
    var val = Math.floor(Math.random() * 10000)
    for (var k = 0; k < arr.length && val >= 0; k++) {
      if (arr[k] == val) val = -1
      if (arr[k] > val) continue
    }
  } while (val < 0)

  var searchIdx = getLowestEqualIndex(arr, binarySearch(arr, val))
  if (searchIdx != null) throw new Error("Found index when it should be missing")
}
console.log("RETURNED NULL FOR ALL MISSING VALUES")

function binarySearch(arr, val) {
  var start = 0, end = arr.length - 1, mid, midVal

  while (true) {
    if (end < start) return null
    mid = Math.floor((end - start) / 2) + start
    midVal = arr[mid]

    if (val < midVal) {
      end = mid - 1
    } else if (val > midVal) {
      start = mid + 1
    } else {
      return mid
    }
  }
}

/**
 * Get the lowest index which has the same value as the specified index
 * @param  {Array.<number>} arr [description]
 * @param  {[type]} idx [description]
 * @return {[type]}     [description]
 */
function getLowestEqualIndex(arr, idx) {
  if (idx == null) return null
  while (idx >= 1 && arr[idx - 1] == arr[idx]) idx--
  return idx
}

/**
 * Create a sorted array of numbers
 *
 * @param  {number} length the number of items to insert into the array
 * @param  {number} min    the minimium value for each item
 * @param  {number} max    the maximum value for each item (non-inclusive)
 * @return {Array.<number>} The array of numbers
 */
function createSortedArray(length, min, max) {
  var rangeSize = max - min
  var items = []
  for (var i = 0; i < length; i++) {
    items.push(Math.floor(Math.random() * rangeSize) + min)
  }
  return items.sort(function (a, b){ return a - b })
}