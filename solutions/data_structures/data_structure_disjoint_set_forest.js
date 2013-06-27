function DisjointSet(data) {
  this._data = data
  this._parent = this
  this._rank = 0
}

DisjointSet.prototype.setParent = function (parent) {
  this._parent = parent
}

DisjointSet.prototype.getParent = function () {
  return this._parent
}

DisjointSet.prototype.setRank = function (rank) {
  this._rank = rank
}

DisjointSet.prototype.getRank = function () {
  return this._rank
}

DisjointSet.prototype.findParent = function () {
  if (this._parent != this) {
    this._parent = this._parent.findParent()
  }
  return this._parent
}

DisjointSet.prototype.union = function (otherSet) {
  var aRoot = this.findParent()
  var bRoot = otherSet.findParent()

  // in the same set already
  if (aRoot == bRoot) return

  if (aRoot.getRank() < bRoot.getRank()) {
    aRoot.setParent(bRoot)
  } else if (aRoot.getRank() > bRoot.getRank()) {
    bRoot.setParent(aRoot)
  } else {
    aRoot.setParent(bRoot)
    bRoot.setRank(bRoot.getRank() + 1)
  }
}