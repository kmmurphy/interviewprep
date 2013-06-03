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
    var maxDepth = 8
    try {
      var searchNode = depthFirstSearchIterative(nodeArr[0], node.getData().val, maxDepth)
      if (node !== searchNode) {
        console.error("Unable to find node")
        return
      }
    } catch (e) {
      if (e.message == ERROR_LIMITED_BY_DEPTH) {
        // couldn't find the node because of depth, make sure the node's depth is higher than max depth
        var depth = 0
        do {
          node = node.getParent()
          depth++
        } while (node.getParent())

        if (depth <= maxDepth) {
          throw new Error("Node was found at depth of " + depth)
        }
      } else {
        throw e
      }
    }
  }
  console.log("FOUND ALL NODES!")

  // test limiting a non-existent search by depth
  try {
    node = depthFirstSearchIterative(nodeArr[0], 100000, 5)
    console.error("SHOULD HAVE FAILED DUE TO LIMITED DEPTH")
  } catch (e) {
    if (e.message != ERROR_LIMITED_BY_DEPTH) throw e
    console.log("LIMITED BY DEPTH AS EXPECTED FOR MISSING NODE")
  }

  // test searching for a non-existent node w/ a high depth limit
  node = depthFirstSearchIterative(nodeArr[0], 100000, nodeArr.length)
  if (node != null) console.error("SHOULD HAVE FAILED DUE TO MISSING NODE")
  else console.log("MISSING NODE NOT FOUND AS EXPECTED")

})

var ERROR_NO_NODES_REMAINING = "No nodes remaining"
var ERROR_LIMITED_BY_DEPTH = "Limited by depth"

/**
 * Search for a specific node using depth-first iterative search
 *
 * @param  {Node} rootNode the root node
 * @param  {Object} val the value to search for
 * @return {Node} the node containing the value
 */
function depthFirstSearchIterative(rootNode, val, maxDepth) {
  var currentDepth = 0
  while (currentDepth <= maxDepth) {
    try {
      var node = findNode(rootNode, val, currentDepth)
      if (node) return node
    } catch (e) {
      if (e.message == ERROR_NO_NODES_REMAINING) return null
    }
    currentDepth++
  }
  throw new Error(ERROR_LIMITED_BY_DEPTH)
}

/**
 * Find a node with the provided value and number of remaining steps
 *
 * @param  {Node} rootNode the root node
 * @param  {Object} val the value to search for
 * @param  {number} remainingSteps the number of remaining steps to search
 * @return {Node} the node if it exists
 */
function findNode(rootNode, val, remainingSteps) {
  if (rootNode.getData().val == val) return rootNode
  var nodes = rootNode.getChildNodes()
  if (remainingSteps == 0 && nodes.length) throw new Error(ERROR_LIMITED_BY_DEPTH)

  var message = ERROR_NO_NODES_REMAINING
  for (var i = 0; i < nodes.length; i++) {
    try {
      return findNode(nodes[i], val, remainingSteps - 1)
    } catch (e) {
      if (e.message == ERROR_LIMITED_BY_DEPTH) message = ERROR_LIMITED_BY_DEPTH
    }
  }
  throw new Error(message)
}

/**
 * Create a new node
 *
 * @param {Object} data the data for this node
 * @constructor
 */
function Node(data) {
  this._edges = []
  this._data = data
  this._parent = null
}

/**
 * Set the parent node for this node
 * @param  {Node} parent the parent node
 */
Node.prototype.setParent = function (parent) {
  this._parent = parent
}

/**
 * Return the parent node for this node
 * @return {Node} the parent node
 */
Node.prototype.getParent = function () {
  return this._parent
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
  node.setParent(this)
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