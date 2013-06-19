function Node(val) {
  this._val = val
  this._parent = null
  this._children = [null, null]
}

Node.prototype.removeChild = function (node) {
  if (this._children[1] === node) {
    this._children[1] = null
  } else if (this._children[0] === node) {
    this._children[0] = null
  } else {
    throw new Error("Node does not have the specified child")
  }
}

Node.prototype.setChild = function (idx, node) {
  this._children[idx] = node
}

Node.prototype.getChild = function (idx) {
  return this._children[idx]
}

Node.prototype.setParent = function (node) {
  this._parent = node
}

Node.prototype.getParent = function () {
  return this._parent
}

Node.prototype.setValue = function (val) {
  this._val = val
}

Node.prototype.getValue = function () {
  return this._val
}

function MaxHeap() {
  this._rootNode = null
  this._nextParent = null
  this._lastNode = null
}

MaxHeap.prototype._swapNodes = function (node, parent) {
  var tempValue = node.getValue()
  node.setValue(parent.getValue())
  parent.setValue(tempValue)
  return parent
}

MaxHeap.prototype._downheap = function (node) {
  var shouldDownheap

  do {
    shouldDownheap = false
    var swapChild = null
    var maxVal = node.getValue()

    for (var i = 0; i < 2; i ++) {
      var child = node.getChild(i)
      if (child && child.getValue() > maxVal) {
        swapChild = child
        maxVal = child.getValue()
      }
    }

    if (swapChild) {
      shouldDownheap = true
      node = this._swapNodes(node, swapChild)
    }
  } while (shouldDownheap)
}

MaxHeap.prototype._upheap = function (node) {
  var shouldUpheap
  do {
    shouldUpheap = false

    var parent = node.getParent()
    if (parent && parent.getValue() < node.getValue()) {
      shouldUpheap = true
      node = this._swapNodes(node, parent)
    }
  } while (shouldUpheap)
}

MaxHeap.prototype._findIndex = function (idx) {

}

MaxHeap.prototype._findPreviousNode = function (node) {
  var parentNode = node.getParent()

  if (!parentNode) {
    // this is the root node, there is no previous node
    return null

  } else if (parentNode.getChild(1) == node) {
    // this is the right node, grab the left
    return parentNode.getChild(0)

  } else {
    var nextNode = node
    var foundBranch = false

    // right node
    while (nextNode.getParent() && !foundBranch) {
      var parentNode = nextNode.getParent()
      if (parentNode.getChild(1) === nextNode) {
        nextNode = parentNode.getChild(0)
        foundBranch = true
      } else {
        nextNode = parentNode
      }
    }

    while (nextNode.getChild(1)) {
      nextNode = nextNode.getChild(1)
    }
    return nextNode
  }
}

MaxHeap.prototype._findNextParent = function (node) {
  var parentNode = node.getParent()

  if (!parentNode) {
    // root node
    return node.getChild(0)

  } else if (parentNode.getChild(0) === node) {
    // left node
    return parentNode.getChild(1)

  } else {
    var nextNode = node
    var foundBranch = false

    // right node
    while (nextNode.getParent() && !foundBranch) {
      var parentNode = nextNode.getParent()
      if (parentNode.getChild(0) === nextNode) {
        nextNode = parentNode.getChild(1)
        foundBranch = true
      } else {
        nextNode = parentNode
      }
    }

    while (nextNode.getChild(0)) {
      nextNode = nextNode.getChild(0)
    }
    return nextNode
  }
}

MaxHeap.prototype.insert = function (val) {
  var node = new Node(val)

  if (!this._rootNode) {
    // set the root node
    this._rootNode = this._nextParent = this._lastNode = node

  } else {
    // set any other node
    var idx = this._nextParent.getChild(0) ? 1 : 0
    this._nextParent.setChild(idx, node)
    this._lastNode = node
    node.setParent(this._nextParent)
    this._upheap(node)

    if (idx === 1) {
      // setting the right node, need to find the next parent
      this._nextParent = this._findNextParent(this._nextParent)
    }
  }
}

MaxHeap.prototype.remove = function () {
  // no nodes in the heap
  if (!this._rootNode) return null

  var val = this._rootNode.getValue()

  if (this._rootNode == this._lastNode) {
    // the root is the last node
    this._rootNode = this._lastNode = this._nextParent = null

  } else {
    // swap the root with the last node
    this._swapNodes(this._rootNode, this._lastNode)

    // delete the last node, find the new last node, and reset the parent
    var currentLast = this._lastNode
    this._nextParent = currentLast.getParent()
    this._lastNode = this._findPreviousNode(currentLast)
    currentLast.getParent().removeChild(currentLast)

    // downheap the new root
    this._downheap(this._rootNode)
  }

  return val
}

MaxHeap.prototype.getRootNode = function () {
  return this._rootNode
}

MaxHeap.prototype.validate = function () {
  if (!this._rootNode) return true

  var nodes = [this._rootNode]

  while (nodes.length) {
    var node = nodes.shift()
    var val = node.getValue()
    var childrenVals = []

    for (var i = 0; i < 2; i++) {
      var child = node.getChild(i)
      if (child) {
        if (child.getValue() > node.getValue()) {
          throw new Error("The heap is invalid because " + child.getValue() + " is greater than " + node.getValue())
        }
        nodes.push(child)
      }
    }
  }
}

var lastNode = null
var maxHeap = new MaxHeap()

// add a bunch of nodes
for (var i = 0; i < 20; i++) {
  maxHeap.insert(i); //Math.floor(Math.random() * 1000))
  maxHeap.validate()
}

// remove the top nodes
for (var i = 0; i < 20; i++) {
  var next = maxHeap.remove()
  maxHeap.validate()
}

// add a bunch of nodes
for (var i = 0; i < 20; i++) {
  maxHeap.insert(i); //Math.floor(Math.random() * 1000))
  maxHeap.validate()
}

// remove the top nodes
for (var i = 0; i < 20; i++) {
  var next = maxHeap.remove()
  maxHeap.validate()
}

// verify the heap is empty
if (maxHeap.remove() !== null) throw new Error("Should be nothing left in the heap")
console.log("The heap works!")
