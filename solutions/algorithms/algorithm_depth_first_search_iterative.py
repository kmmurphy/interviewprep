import random

def depthFirstSearchIterative(rootNode, val, maxDepth):
  for currentDepth in range(0, maxDepth + 1):
    try:
      outputNode = depthFirstSearch(rootNode, val, currentDepth)
      if (outputNode is not None):
        return outputNode
    except MaxDepthReachedError:
      if (currentDepth == maxDepth):
        raise

def depthFirstSearch(rootNode, val, maxDepth):
  data = rootNode.getData()

  if (data['val'] == val):
    return rootNode

  # raise an error if children can't be reached
  children = rootNode.getChildNodes()
  numChildren = len(children)
  if (numChildren > 0 and maxDepth == 0):
    raise MaxDepthReachedError('Max depth was reached')

  maxDepthReached = False
  for i in range(0, numChildren):
    try:
      resultNode = depthFirstSearch(children[i], val, maxDepth - 1)
      if (resultNode is not None):
        return resultNode
    except MaxDepthReachedError:
      maxDepthReached = True

  if (maxDepthReached):
    raise MaxDepthReachedError("Max depth was reached")

  return None

class MaxDepthReachedError(Exception):
  def __init__(self, value):
    self.value = value

  def __str__(self):
    return repr(self.value)

class Edge:
  def setTarget(self, target):
    self._target = target

  def getTarget(self):
    return self._target


class Node:
  def __init__(self, data):
    self._edges = []
    self._data = data
    self._parent = None

  def getData(self):
    return self._data

  def getParent(self):
    return self._parent

  def addChild(self, child):
    edge = Edge()
    edge.setTarget(child)
    child._parent = self
    self._edges.append(edge)

  def getChildNodes(self):
    nodes = []
    for i in range(0, len(self._edges)):
      nodes.append(self._edges[i].getTarget())
    return nodes

nodes = []
nodes.append(Node({'val': 0}))
for i in range(1, 1000):
  node = Node({'val': i})
  parentIdx = random.randint(0, len(nodes) - 1)
  nodes[parentIdx].addChild(node)
  nodes.append(node)

missingNodes = 0
for i in range(0, 1000):
  idx = random.randint(0, len(nodes) - 1)
  node = nodes[idx]
  val = node.getData()['val']

  try:
    searchNode = depthFirstSearchIterative(nodes[0], val, 8)
    if searchNode != node:
      missingNodes += 1
  except MaxDepthReachedError:
    depth = 0
    while node.getParent()  is not None:
      node = node.getParent()
      depth += 1
    if depth <= 8:
      missingNodes += 1

print "Finished search, missing nodes:", missingNodes