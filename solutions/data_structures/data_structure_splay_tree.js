function Node(val) {
  this._val = val
  this._parent = null
  this._children = [null, null]
}

Node.prototype.getIndexForChild = function (node) {
  if (this._children[1] === node) {
    return 1
  } else if (this._children[0] === node) {
    return 0
  } else {
    throw new Error("Node does not have the specified child")
  }
}

Node.prototype.swapChild = function (oldNode, newNode) {
  var idx = this.getIndexForChild(oldNode)
  if (oldNode) oldNode.setParent(null)
  this.setChild(idx, newNode)
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

function SplayTree() {
  this._rootNode = null
}

SplayTree.prototype.insert = function (val) {
  var node = new Node(val)

  if (!this._rootNode) {
    // set the root
    this._setRootNode(node)

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

  // rotate the node to the top of the tree
  this._splay(node)

  return node
}

SplayTree.prototype.remove = function (node) {
  // rotate the node to the top of the tree
  this._splay(node)

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
      this._setRootNode(null)
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
      this._setRootNode(child)
    }

    node.setParent(null)
  }
}

SplayTree.prototype.find = function (val) {
  var nextNode = this._rootNode

  while (nextNode) {
    var nextVal = nextNode.getValue()
    if (nextVal === val) {
      // rotate the found node to the top of the tree
      this._splay(nextNode)
      return nextNode
    }
    else if (nextVal > val) nextNode = nextNode.getChild(0)
    else nextNode = nextNode.getChild(1)
  }

  return null
}

SplayTree.prototype._setRootNode = function (node) {
  if (node) node.setParent(null)
  this._rootNode = node
}

SplayTree.prototype._rotateToRoot = function (node) {
  var parent = node.getParent()
  var grandParent = parent.getParent()
  var side = parent.getIndexForChild(node)
  var childIdx = side === 1 ? 0 : 1

  // find the child closest to the parent
  var oldChild = node.getChild(childIdx)

  if (grandParent) {
    grandParent.swapChild(parent, node)
  } else {
    this._setRootNode(node)
  }

  // swap the old child with the parent
  node.setChild(childIdx, parent)

  // swap the node with its old child on the parent
  parent.setChild(side, oldChild)
}

SplayTree.prototype._splay = function (node) {
  var parent = node.getParent()

  while (parent) {
    if (parent === this._rootNode) {
      // rotate to root
      this._rotateToRoot(node)

    } else {
      if (!parent.getParent() && parent !== this._rootNode) {
        throw new Error("Parent has no parent but is not the root node!")
      }
      var parentSide = parent.getParent().getIndexForChild(parent)
      var nodeSide = node.getParent().getIndexForChild(node)

      if (parentSide == nodeSide) {
        // parent and child on same sides
        this._rotateToRoot(parent)
        this._rotateToRoot(node)

      } else {
        // parent and child on opposite sides
        this._rotateToRoot(node)
        this._rotateToRoot(node)

      }
    }

    parent = node.getParent()
  }
}

SplayTree.prototype.validate = function () {
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

var splayTree = new SplayTree()
var vals = {}

// add a bunch of nodes
for (var i = 0; i < 20; i++) {
  // create unique values for removal purposes
  var val
  do {
    val = Math.floor(Math.random() * 1000)
  } while (vals[val])

  // insert into the tree and validate
  vals[val] = splayTree.insert(val)
  splayTree.validate()
}
console.log("Tree is valid")

// find all of the vals
for (var key in vals) {
  if (splayTree.find(Number(key)) !== vals[key]) {
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

  var foundNode = splayTree.find(Number(key))
  if (foundNode === null) {
    throw new Error("Value " + key + " was not found")
  }
  splayTree.remove(foundNode)
  splayTree.validate()
  if (splayTree.find(Number(key)) !== null) {
    throw new Error("Value " + key + " was not deleted")
  }
}
console.log("All nodes were deleted")