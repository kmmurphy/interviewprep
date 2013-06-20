function Node(key) {
  this.setKey(key)
  this._childNodes = {}
}

Node.prototype.getChildNode = function (prefix) {
  return this._childNodes[prefix]
}

Node.prototype.createChildNode = function (prefix) {
  var node = new Node(prefix)
  this._childNodes[prefix] = node
  return node
}

Node.prototype.setKey = function (key) {
  this._key = key
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

CompactPrefixTree.prototype.remove = function (key) {
  var node = this._rootNode
  for (var i = 0; i < key.length; i++) {
    var chr = key.substr(i, 1)
    var child = node.getChildNode(chr)
    if (!child) child = node.createChildNode(chr)
    node = child
  }
  child.setValue(undefined)
}

CompactPrefixTree.prototype.get = function (key) {
  var node = this._rootNode
  for (var i = 0; i < key.length; i++) {
    var chr = key.substr(i, 1)
    var child = node.getChildNode(chr)
    if (!child) throw new Error("Key was not found")
    node = child
  }
  return node.getValue()
}

CompactPrefixTree.prototype.getKeys = function (prefix) {

}

CompactPrefixTree.prototype.validate = function () {

}

var vals = {
  'jeremy': 'awesome',
  'kevin': 'is a noob',
  'juan': 'is a random name'
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
  if (treeVal != null) {
    throw new Error("Tree val was found but should be deleted for key " + key)
  }
}
console.log("Verified keys deleted")