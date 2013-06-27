var Colors = {
  BLACK: 0,
  RED: 1,
  DOUBLE_BLACK: 2
}

function Node(val) {
  this._val = val
  this._parent = null
  this._children = [null, null]
  this._color = Colors.RED
}

Node.prototype.getColor = function () {
  return this._color
}

Node.prototype.setColor = function (color) {
  this._color = color
}

Node.prototype.getIndex = function () {
  if (!this._parent) throw new Error("No parent index for a parent-less node")
  return this._parent.getChild(0) === this ? 0 : 1
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

function RedBlackTree() {
  this._rootNode = null
}

function isRed(node) {
  if (!node) return false
  return node.getColor() === Colors.RED
}

function isBlack(node) {
  if (!node) return true
  return node.getColor() === Colors.BLACK
}

function isDoubleBlack(node) {
  if (!node) return false
  return node.getColor() === Colors.DOUBLE_BLACK
}

RedBlackTree.prototype._rotate = function (node, parent, grandparent, idx, pIdx) {
  var cIdx = idx ? 0 : 1
  var child = node.getChild(cIdx)

  // move the child to the parent's opposite side
  parent.setChild(idx, child)

  // move the parent to where the child used to be
  node.setChild(cIdx, parent)

  // move the current node to where the parent used to be
  if (grandparent) {
    grandparent.setChild(pIdx, node)
  } else {
    node.setParent(null)
    this._setRootNode(node)
  }
}

RedBlackTree.prototype._redBlackRemove = function (node) {
  if (isRed(node)) {
    // red nodes are always safe to remove
    return true
  }

  var child = node.getChild(0) || node.getChild(1)
  if (isRed(child)) {
    // just swap colors with the child and sanity is preserved
    child.setColor(Colors.BLACK)
    return true
  }

  throw new Error("NOO")

}

RedBlackTree.prototype._redBlackInsert = function (node) {
  var p, u, g, c
  var pIsBlack, uIsBlack, nIsBlack
  var nIdx, uIdx, pIdx, cIdx
  var counters = 0

  while (true) {
    counters++
    // case 1: this is the root node, make sure it's colored black
    if (node === this._rootNode) {
      node.setColor(Colors.BLACK)
      return 1
    }

    // case 2: parent is black, this node is valid
    p = node.getParent()
    pIsBlack = isBlack(p)
    if (pIsBlack) return 2

    // case 3: p and u are red, paint them black and g red, recurse to insert case 1 w/ g
    pIdx = p.getIndex()
    uIdx = pIdx ? 0 : 1
    g = p.getParent()
    u = g.getChild(uIdx)
    uIsBlack = isBlack(u)
    if (!uIsBlack /* THIS IS IMPLICIT: && !pIsBlack */) {
      u.setColor(Colors.BLACK)
      p.setColor(Colors.BLACK)
      g.setColor(Colors.RED)
      node = g
      continue;
    }

    // case 4: p is red, u is black, node and p are on opposite sides, swap them
    nIdx = node.getIndex()
    if (/* THIS IS IMPLICIT: !pIsBlack && uIsBlack && */ nIdx !== pIdx) {
      // rotate the node with its parent
      this._rotate(node, p, g, nIdx, pIdx)

      // continue to 5 w/ former parent
      var temp = node
      node = p
      p = temp

      nIdx = nIdx ? 0 : 1
    }

    // case 5: p is red, u is black, node and p are on same sides, rotate p with g, swap p and g colors
    // rotate p w/ g
    var gg = g.getParent()
    this._rotate(p, g, gg, pIdx, gg ? g.getIndex() : -1)

    // swap p and g colors
    g.setColor(Colors.RED)
    p.setColor(Colors.BLACK)

    return 5
  }
}

RedBlackTree.prototype._setRootNode = function (node) {
  this._rootNode = node
  if (node) node.setParent(null)
}

RedBlackTree.prototype.insert = function (val) {
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

  var insertCase = this._redBlackInsert(node)
  this.validate()
  return node
}

RedBlackTree.prototype.remove = function (node) {
  var left = node.getChild(0)
  var right = node.getChild(1)
  var child

  if (left && right) {
    // work with the next in-order successor instead of this node
    var nextNode = right
    while (nextNode.getChild(0)) {
      nextNode = nextNode.getChild(0)
    }

    node.setValue(nextNode.getValue())
    node = nextNode
    child = node.getChild(1)

  } else {
    child = left || right
  }

  if (node === this._rootNode) {
    // overwrite the root
    this._setRootNode(child)
    console.log("RESET ROOT NODE")
  } else {
    // rotate the node into a position to be removed
    this._redBlackRemove(node)
    node.getParent().swapChild(node, child)
    console.log("REMOVED CHILD AFTER ROTATING INTO POSITION")
  }

  this.validate()
}

RedBlackTree.prototype.find = function (val) {
  var nextNode = this._rootNode

  while (nextNode) {
    var nextVal = nextNode.getValue()
    if (nextVal === val) return nextNode
    else if (nextVal > val) nextNode = nextNode.getChild(0)
    else nextNode = nextNode.getChild(1)
  }

  return null
}

RedBlackTree.prototype.validate = function () {
  if (!this._rootNode) return
  var numBlacks = -1

  var nodes = [this._rootNode]
  while (nodes.length) {
    var node = nodes.shift()

    // if this node has empty leaves, calculate # of black nodes to the root
    if (!node.getChild(0) || !node.getChild(1)) {
      var blackCount = 0
      var checkNode = node
      while (checkNode) {
        if (isBlack(checkNode)) blackCount++
        checkNode = checkNode.getParent()
      }

      if (numBlacks === -1) numBlacks = blackCount
      else if (numBlacks !== blackCount) throw new Error("Number of nodes between leaves and root did not match " + numBlacks + " / " + blackCount)
    }

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

var searchTree = new RedBlackTree()
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