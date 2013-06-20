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
  delete this._childNodes[node.getKey()]
}

Node.prototype.getChildNode = function (prefix) {
  return this._childNodes[prefix]
}

Node.prototype.createChildNode = function (prefix) {
  var node = new Node(prefix, this)
  this._childNodes[prefix] = node
  return node
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
  var node = this._rootNode
  for (var i = 0; i < key.length; i++) {
    var chr = key.substr(i, 1)
    var child = node.getChildNode(chr)
    if (!child) child = node.createChildNode(chr)
    node = child
  }
  child.setValue(val)
}

CompactPrefixTree.prototype._removeNode = function (node) {
  while (node !== this._rootNode && typeof node.getValue() === 'undefined' && node.getNumChildren() === 0) {
    var parent = node.getParent()
    parent.removeChildNode(node)
    node = parent
  }
}

CompactPrefixTree.prototype.remove = function (key) {
  var node = this._rootNode
  for (var i = 0; i < key.length; i++) {
    var chr = key.substr(i, 1)
    var child = node.getChildNode(chr)
    if (!child) child = node.createChildNode(chr)
    node = child
  }

  child.setValue(undefined)
  this._removeNode(child)
}

CompactPrefixTree.prototype.get = function (key) {
  var node = this._rootNode
  for (var i = 0; i < key.length; i++) {
    var chr = key.substr(i, 1)
    var child = node.getChildNode(chr)
    if (!child) return undefined
    node = child
  }
  return node.getValue()
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
    var childNodes = node.getChildNodes()
    if (node !== this._rootNode && typeof node.getValue() === 'undefined' && childNodes.length === 0) {
      throw new Error("A node was found without a value or children")
    }
    for (var i = 0; i < childNodes.length; i++) {
      nodes.push(childNodes[i])
    }
  }
  // console.log("Validated", count, "nodes")
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