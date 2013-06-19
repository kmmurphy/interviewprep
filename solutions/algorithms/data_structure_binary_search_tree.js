function Node(val) {
  this._val = val
  this._parent = null
  this._children = [null, null]
}

Node.prototype.swapChild = function (oldNode, newNode) {
  if (this._children[1] === oldNode) {
    oldNode.setParent(null)
    this.setChild(1, newNode)
  } else if (this._children[0] === oldNode) {
    oldNode.setParent(null)
    this.setChild(0, newNode)
  } else {
    throw new Error("Node does not have the specified child")
  }
}

Node.prototype.removeChild = function (node) {
  this.swapChild(node, null)
}

Node.prototype.setChild = function (idx, node) {
  this._children[idx] = node
  if (node) node.setParent(this)
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

function SearchTree() {
  this._rootNode = null
}

SearchTree.prototype.insert = function (val) {
  var node = new Node(val)

  if (!this._rootNode) {
    // set the root
    this._rootNode = node

  } else {
    // find the appropriate place
    var parent = this._rootNode
    var idx, nextNode
    do {
      if (parent.getValue() < val) {
        idx = 1
      } else {
        idx = 0
      }
      nextNode = parent.getChild(idx)
      if (nextNode) parent = nextNode
    } while (nextNode)

    parent.setChild(idx, node)
  }

  return node
}

SearchTree.prototype.remove = function (node) {
  var parent = node.getParent()
  var leftChild = node.getChild(0)
  var rightChild = node.getChild(1)

  if (!leftChild && !rightChild) {
    // node is a leaf, remove
    if (parent) {
      // standard parent
      parent.removeChild(node)

    } else {
      // no parent and no children means this is the only node
      this._rootNode = null
    }
    node.setParent(null)

  } else if (leftChild && rightChild){
    // find the next in-order successor
    var child = rightChild
    while (child.getChild(0)) {
      child = child.getChild(0)
    }

    // swap with the child node to the right
    node.setValue(child.getValue())
    return this.remove(child)

  } else {
    // replace with the child
    var child = leftChild || rightChild
    if (parent) {
      parent.swapChild(node, child)
    } else {
      this._rootNode = child
      child.setParent(null)
    }

    node.setParent(null)
  }
}

SearchTree.prototype.find = function (val) {
  var nextNode = this._rootNode

  while (nextNode) {
    var nextVal = nextNode.getValue()
    if (nextVal === val) return nextNode
    else if (nextVal > val) nextNode = nextNode.getChild(0)
    else nextNode = nextNode.getChild(1)
  }

  return null
}

SearchTree.prototype.validate = function () {
  if (!this._rootNode) return

  var nodes = [this._rootNode]
  while (nodes.length) {
    var node = nodes.shift()

    for (var i = 0; i < 2; i++) {
      var child = node.getChild(i)
      if (child) {
        if (i == 0 && child.getValue() > node.getValue()) {
          throw new Error("Left node is greater than center node")
        } else if (i == 1 && child.getValue() < node.getValue()) {
          throw new Error("Right node is less than center node")
        }

        nodes.push(child)
      }
    }
  }
}

var searchTree = new SearchTree()
var vals = {}

// add a bunch of nodes
for (var i = 0; i < 20; i++) {
  // create unique values for removal purposes
  var val
  do {
    val = Math.floor(Math.random() * 1000)
  } while (vals[val])

  // insert into the tree and validate
  vals[val] = searchTree.insert(val)
  searchTree.validate()
}
console.log("Tree is valid")

// find all of the vals
for (var key in vals) {
  if (searchTree.find(Number(key)) !== vals[key]) {
    throw new Error("Value " + key + " was not found")
  }
}
console.log("All nodes were found")

// remove all of the vals
var keys = Object.keys(vals)
while (keys.length) {
  var keyIdx = Math.floor(Math.random() * keys.length)
  var key = keys[keyIdx]
  keys.splice(keyIdx, 1)

  var foundNode = searchTree.find(Number(key))
  if (foundNode === null) {
    throw new Error("Value " + key + " was not found")
  }
  searchTree.remove(foundNode)
  searchTree.validate()
  if (searchTree.find(Number(key)) !== null) {
    throw new Error("Value " + key + " was not deleted")
  }
}
console.log("All nodes were deleted")