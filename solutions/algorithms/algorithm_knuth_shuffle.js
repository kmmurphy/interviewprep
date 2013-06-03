process.nextTick(function () {

  var string = 'abcdefghijklmnopqrstuvwxyz'
  var writer = new ShufflingWriter()
  for (var i = 0; i < string.length; i++) {
    writer.write(string.substr(i, 1))
    console.log(writer.getUnshuffledString(), writer.getShuffledString())
  }

})

/**
 * Shuffle an array using the knuth shuffle
 *
 * @param  {Array} arr the array to shuffle
 * @return {Array} the shuffled array
 */
function knuthShuffle(arr) {
  for (var i = arr.length - 1; i >= 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
  return arr
}

/**
 * A writer which will write characters in using the knuth shuffle
 */
function ShufflingWriter() {
  this._chars = []
  this._shuffled = []
}

/**
 * Write a character to the shuffler
 * @param  {string} chr the character
 * @return {ShufflingWriter} the writer
 */
ShufflingWriter.prototype.write = function (chr) {
  this._chars.push(chr)

  var idx = Math.floor(Math.random() * this._shuffled.length + 1)
  if (idx == this._shuffled.length) {
    this._shuffled.push(chr)
  } else {
    this._shuffled.push(this._shuffled[idx])
    this._shuffled[idx] = chr
  }
  return this
}

/**
 * Get the shuffled version of the string
 * @return {string} the shuffled string
 */
ShufflingWriter.prototype.getShuffledString = function () {
  return this._shuffled.join('')
}

/**
 * Get the unshuffled version of the string
 * @return {string} the unshuffled string
 */
ShufflingWriter.prototype.getUnshuffledString = function () {
  return this._chars.join('')
}