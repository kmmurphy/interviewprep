process.nextTick(function () {
  var nodeArr = [new Node({val: 0})]

  /**
   * Create a thousand nodes with random parents (top of tree will be denser)
   */
  for (var i = 0; i < 1000; i++) {
    var newNode = new Node({val: i + 1})
    var parentNode = nodeArr[Math.floor(Math.random() * nodeArr.length)]
    parentNode.addChild(newNode)
    nodeArr.push(newNode)
  }

  /**
   * Search for 100 different nodes in the tree by their values
   */
  for (var j = 0; j < 100; j++) {
    var node = nodeArr[Math.floor(Math.random() * (nodeArr.length - 1) + 1)]
    var searchNode = breadthFirstSearch(nodeArr[0], node.getData().val)
    if (node !== searchNode) {
      console.error("Unable to find node")
      return
    }
  }
  console.log("FOUND ALL NODES!")

})

/**
 * Search for a specific node using breadth-first search
 *
 * @param  {Node} rootNode the root node
 * @param  {Object} val the value to search for
 * @return {Node} the node containing the value
 */
function breadthFirstSearch(rootNode, val) {
  var searchNodes = [rootNode]

  while (searchNodes.length) {
    var node = searchNodes.shift()
    if (node.getData().val == val) return node

    var childNodes = node.getChildNodes()
    for (var i = 0; i < childNodes.length; i++) {
      searchNodes.push(childNodes[i])
    }
  }
}

/**
 * Create a new node
 * @param {Object} data the data for this node
 * @constructor
 */
function Node(data) {
  this._edges = []
  this._data = data
}

/**
 * Get the data for this node
 * @return {Object} the data provided to this node
 */
Node.prototype.getData = function () {
  return this._data
}

/**
 * Add a child node
 * @param  {Node} node the child node
 */
Node.prototype.addChild = function (node) {
  var edge = new Edge
  edge.setTarget(node)
  this._edges.push(edge)
}

/**
 * Retrieve all children nodes for this node
 * @return {Array.<Node>} the children
 */
Node.prototype.getChildNodes = function () {
  var nodes = []
  for (var i = 0; i < this._edges.length; i++) {
    nodes.push(this._edges[i].getTarget())
  }
  return nodes
}

/**
 * Represents an edge from one node to another
 * @constructor
 */
function Edge() {
  this._target = null
}

/**
 * Set the destination node for an edge
 * @param  {Node} node the destination node
 */
Edge.prototype.setTarget = function (node) {
  this._target = node
}

/**
 * Get the destination node for an edge
 * @return {Node} the destination node
 */
Edge.prototype.getTarget = function () {
  return this._target
}