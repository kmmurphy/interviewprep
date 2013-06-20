function Node(key, parent) {
  this._childNodes = {}
  this.setKey(key)
  this.setParent(parent)
}

Node.prototype.setParent = function (parent) {
  this._parent = parent
}

Node.prototype.getParent = function () {
  return this._parent
}

Node.prototype.getNumChildren = function () {
  return Object.keys(this._childNodes).length
}

Node.prototype.getChildNodes = function (prefix) {
  var hasPrefix = typeof prefix != 'undefined'
  var nodes = []
  for (var key in this._childNodes) {
    if (!hasPrefix || key.indexOf(prefix) === 0) nodes.push(this._childNodes[key])
  }
  return nodes
}

Node.prototype.removeChildNode = function (node) {
  delete this._childNodes[firstLetter(node.getKey())]
}

Node.prototype.setChild = function (key, child) {
  this._childNodes[firstLetter(key)] = child
  child.setParent(this)
}

Node.prototype.getChildNode = function (prefix, shouldCreate) {
  // store all nodes by their first char only (we can only have one anyway)
  var first = firstLetter(prefix)
  var node = this._childNodes[first]

  if (shouldCreate && !node) {
    // creating the node if it doesn't exist
    var node = new Node(prefix, this)
    this._childNodes[first] = node
    return node
  }

  // node doesn't exist
  if (!node) return undefined

  // check for an exact match
  var nodeKey = node.getKey()
  if (nodeKey == prefix) return node

  if (prefix.indexOf(nodeKey) === 0) {
    // check if the prefix starts with the node's key
    return node.getChildNode(prefix.substr(nodeKey.length), shouldCreate)
  }

  // the key doesn't match and we're not creating, just exit
  if (!shouldCreate) return undefined

  // find the common prefix and create a new node with the prefix
  var commonPrefix = findCommonPrefix(prefix, nodeKey)
  var commonNode = new Node(commonPrefix, this)
  this.setChild(commonPrefix, commonNode)

  // rename the old node and add it as a child to the common node
  node.setKey(nodeKey.substr(commonPrefix.length))
  commonNode.setChild(node.getKey(), node)

  // continue on with the new common node
  return commonNode.getChildNode(prefix.substr(commonPrefix.length), shouldCreate)
}

Node.prototype.setKey = function (key) {
  this._key = key
}

Node.prototype.getKey = function (key) {
  return this._key
}

Node.prototype.setValue = function (val) {
  this._val = val
}

Node.prototype.getValue = function () {
  return this._val
}

function CompactPrefixTree() {
  this._rootNode = new Node('')
}

CompactPrefixTree.prototype.set = function (key, val) {
  var node = this._rootNode.getChildNode(key, true)
  node.setValue(val)
}

CompactPrefixTree.prototype._removeNode = function (node) {
  while (node !== this._rootNode && typeof node.getValue() == 'undefined' && node.getNumChildren() === 0) {
    // remove the leaves
    var parent = node.getParent()
    parent.removeChildNode(node)
    node = parent
  }

  if (node !== this._rootNode && typeof node.getValue() == 'undefined' && node.getNumChildren() === 1) {
    var child = node.getChildNodes()[0]
    child.setKey(node.getKey() + child.getKey())
    node.getParent().setChild(child.getKey(), child)
  }
}

CompactPrefixTree.prototype.remove = function (key) {
  var node = this._rootNode.getChildNode(key)
  if (!node) throw new Error("Trying to remove a non-existent key")
  node.setValue(undefined)
  this._removeNode(node)
}

CompactPrefixTree.prototype.get = function (key) {
  var node = this._rootNode.getChildNode(key)
  return node ? node.getValue() : undefined
}

CompactPrefixTree.prototype.getKeys = function (prefix) {

}

CompactPrefixTree.prototype.validate = function () {
  if (!this._rootNode) return

  // all nodes should have children or a value
  var count = 0
  var nodes = [this._rootNode]
  while (nodes.length) {
    count++
    var node = nodes.shift()
    var nodeVal = node.getValue()
    var childNodes = node.getChildNodes()

    if (node !== this._rootNode) {
      // node is a leaf without a value, should delete
      if (typeof nodeVal === 'undefined' && childNodes.length === 0) {
        throw new Error("A node was found without a value or children")
      }

      // compact prefix tree validation logic, node needs at least 2 children or a value
      if (typeof nodeVal === 'undefined' && childNodes.length === 1) {
        throw new Error("This node should be compacted")
      }
    }

    for (var i = 0; i < childNodes.length; i++) {
      nodes.push(childNodes[i])
    }
  }
}

function findCommonPrefix(str1, str2) {
  var idx = 0
  while (idx < str1.length && idx < str2.length && str1[idx] == str2[idx]) {
    idx++
  }
  if (idx === 0) throw new Error("WTF, there is no common prefix")
  return str1.substr(0, idx)
}

function firstLetter(str) {
  return str.substr(0, 1)
}

var vals = {}
var letters = 'abcdefghijklmnopqrstuvwxyz'

//  build up a bunch of random keys and vals
for (var i = 0; i < 100; i++) {
  var found, newKey
  do {
    found = false
    newKey = ''

    var numChars = Math.floor(Math.random() * 6) + 3
    for (var j = 0; j < numChars; j++) {
      newKey += letters.substr(Math.floor(Math.random() * letters.length), 1)
    }

    if (vals[newKey]) found = true
  } while (found)

  vals[newKey] = Math.floor(Math.random() * 10000)
}

var prefixTree = new CompactPrefixTree()
for (var key in vals) {
  prefixTree.set(key, vals[key])
  prefixTree.validate()
}
console.log("Set initial keys")

for (var key in vals) {
  var treeVal = prefixTree.get(key)
  if (treeVal != vals[key]) {
    throw new Error("Tree val did not match key val for key " + key)
  }
}
console.log("Retrieved all keys")

for (var key in vals) {
  prefixTree.remove(key)
  prefixTree.validate()
}
console.log("Removed all keys")

for (var key in vals) {
  var treeVal = prefixTree.get(key)
  if (typeof treeVal != 'undefined') {
    throw new Error("Tree val was found but should be deleted for key " + key)
  }
}
console.log("Verified keys deleted")