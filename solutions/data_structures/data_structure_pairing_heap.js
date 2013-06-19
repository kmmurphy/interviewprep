function PairingHeap(val) {
  this._val = val
  this._subheaps = []
}

PairingHeap.prototype._addSubheap = function (subheap) {
  this._subheaps.push(subheap)
}

PairingHeap.prototype.getValue = function () {
  return this._val
}

PairingHeap.prototype.getSubheaps = function () {
  return this._subheaps
}

PairingHeap.prototype.insert = function (val) {
  var newHeap = new PairingHeap(val)
  return merge(this, newHeap)
}

PairingHeap.prototype.min = function () {
  return this._val
}

PairingHeap.prototype.removeMin = function () {
  return mergeSubheaps(this._subheaps)
}

PairingHeap.prototype.validate = function () {
  var heaps = [this]

  while (heaps.length) {
    var heap = heaps.shift()
    var subheaps = heap.getSubheaps()
    for (var i = 0; i < subheaps.length; i++) {
      var subheap = subheaps[i]
      heaps.push(subheap)
      if (subheap.getValue() < heap.getValue()) {
        throw new Error("The heap is invalid")
      }
    }
  }
}

function mergeSubheaps(subheaps) {
  if (!subheaps.length) return new PairingHeap()
  else if (subheaps.length === 1) return subheaps[0]
  else {
    var first = merge(subheaps[0], subheaps[1])
    return merge(first, mergeSubheaps(subheaps.slice(2)))
  }
}

function merge(heap1, heap2) {
  if (!heap1 || typeof heap1.getValue() == 'undefined') return heap2
  else if (!heap2 || typeof heap2.getValue() == 'undefined') return heap1
  else if (heap1.getValue() > heap2.getValue()) {
    heap2._addSubheap(heap1)
    return heap2
  } else {
    heap1._addSubheap(heap2)
    return heap1
  }
}

var heap = new PairingHeap()
var vals = []

// add a bunch of values to the heap
for (var i = 0; i < 100; i++) {
  var val = Math.floor(Math.random() * 10000)
  vals.push(val)
  heap = heap.insert(val)
  heap.validate()
}
console.log("Items added to the heap")

vals.sort(function (a, b) {
  return a - b
})

while (vals.length) {
  var val = vals.shift()
  var minVal = heap.min()
  heap = heap.removeMin()
  if (val != minVal) {
    throw new Error("Values removed out of order")
  }
  heap.validate()
}
console.log("All items removed from the heap")
