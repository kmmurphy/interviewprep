function Node(val) {
  this._val = val
  this._next = []
  this._prev = []
}

Node.prototype.getValue = function () {
  return this._val
}

Node.prototype.resetLinks = function () {
  this._next = []
  this._prev = []
}

Node.prototype.getAllNext = function () {
  return this._next
}

Node.prototype.getSingleNext = function (idx) {
  return this._next[idx]
}

Node.prototype.setSingleNext = function (idx, pointer) {
  if (pointer === this) throw new Error("Can't point at self")
  this._next[idx] = pointer
  if (pointer) pointer.setSinglePrev(idx, this)
}

Node.prototype.getAllPrev = function () {
  return this._prev
}

Node.prototype.getSinglePrev = function (idx, pointer) {
  return this._prev[idx]
}

Node.prototype.setSinglePrev = function (idx, pointer) {
  if (pointer === this) throw new Error("Can't point at self")
  this._prev[idx] = pointer
}

function SkipList() {
  this._head = null
  this._totalNodes = 0
}

SkipList.prototype._inject = function (node) {
  // first, calculate however many pointers this node should have
  var numPointers = 0
  var estimatedNodes = 1
  var shouldAdd
  do {
    shouldAdd = Math.random() >= 0.5
    numPointers++
    estimatedNodes *= 2
  } while (shouldAdd && estimatedNodes <= this._totalNodes)

  // grab the pointers from the root node
  var nextPointers = this._head.getAllNext()

  // insert any nodes that are larger than the pointer list
  var i
  var currPointers = nextPointers.length
  for (i = currPointers; i < numPointers; i++) {
    this._head.setSingleNext(i, node)
  }

  // iterate through all remaining pointers and inject this node in the right place
  var currNode = this._head
  i = currPointers - 1
  while (i >= 0) {
    var nextNode = currNode.getSingleNext(i)

    if (!nextNode) {
      // current node is currently pointing to null
      currNode.setSingleNext(i, node)
      i--

    } else if (nextNode.getValue() > node.getValue()) {
      // current node is pointing to a node larger than the injected node
      node.setSingleNext(i, nextNode)
      currNode.setSingleNext(i, node)
      i--

    } else {
      currNode = nextNode
    }
  }
}

SkipList.prototype.insert = function (val) {
  this._totalNodes++
  var node = new Node(val)

  if (!this._head) {
    // new head
    this._head = node
    return node

  } else if (val < this._head.getValue()) {
    // retrieve the pointers for the old head and reset it to a blank state
    var oldHead = this._head
    var all = oldHead.getAllNext()
    oldHead.resetLinks()

    // create the new head and claim the old pointers
    var newHead = this._head = node
    var prevNodes = []
    for (var i = 0; i < all.length; i++) {
      newHead.setSingleNext(i, all[i])
      prevNodes.push(newHead)
    }

    // inject a node somewhere after the head
    this._inject(oldHead)

  } else {
    this._inject(node)
  }

  return node
}

SkipList.prototype.find = function (val) {
  var currNode = this._head
  if (!currNode) return undefined

  var nextNodes = currNode.getAllNext()
  var idx = nextNodes.length - 1
  while (idx >= 0) {
    if (currNode.getValue() === val) return currNode

    var nextNode = nextNodes[idx]
    if (!nextNode || nextNode.getValue() > val) {
      idx--
    } else {
      currNode = nextNode
      nextNodes = currNode.getAllNext()
    }
  }
}

SkipList.prototype.remove = function (node) {
  this._totalNodes--
  var allNext = node.getAllNext()

  if (node === this._head) {
    // promote the next node to be the head
    var newHead = allNext[0]
    if (!newHead) this._head = null
    else {
      for (var i = 0; i < allNext.length; i++) {
        if (allNext[i] != newHead) {
          newHead.setSingleNext(i, allNext[i])
        }
      }
      this._head = newHead
    }

  } else {
    var allPrev = node.getAllPrev()

    // point all prev nodes at own next nodes
    for (var i = 0; i < allPrev.length; i++) {
      allPrev[i].setSingleNext(i, allNext[i])
    }
  }
}

SkipList.prototype.validate = function () {
  if (!this._head) return

  var checkedNodes = 0
  var nodes = [this._head]
  while (nodes.length) {
    checkedNodes++
    var node = nodes.shift()
    var allNext = node.getAllNext()
    var allPrev = node.getAllPrev()

    for (var i = 0; i < allNext.length; i++) {
      if (allNext[i]) {
        if (allNext[i] === node) throw new Error("A node is referencing itself")
        if (allNext[i].getValue() < node.getValue()) throw new Error("Nodes are out of order")
        if (i === 0) nodes.push(allNext[i])

        if (node !== this._head) {
          // verify that all previous nodes point to this node
          for (var j = 0; j < allPrev.length; j++) {
            var prev = allPrev[j]
            if (prev.getSingleNext(j) !== node) throw new Error("Previous node does not point at this node")
          }
        }
      }
    }
  }

  if (checkedNodes != this._totalNodes) throw new Error("Didn't check all nodes (" + checkedNodes + " of " + this._totalNodes + ")")
}



var skipList = new SkipList()
var nodes = []
var vals = []
for (var i = 0; i < 100; i++) {
  var val
  do {
    val = Math.floor(Math.random() * 100000)
  } while (vals.indexOf(val) >= 0)
  vals.push(val)

  nodes.push(skipList.insert(val))
  skipList.validate()
}
console.log("All nodes added to skip list")

for (var i = 0; i < nodes.length; i++) {
  var node = nodes[i]
  var foundNode = skipList.find(node.getValue())
  if (node !== foundNode) throw new Error("Unable to find node")
}
console.log("Found all nodes in the skip list")

while (nodes.length) {
  var idx = Math.floor(Math.random() * nodes.length)
  var node = nodes.splice(idx, 1)[0]
  skipList.remove(node)
  skipList.validate()
}
console.log("All nodes removed from skip list")