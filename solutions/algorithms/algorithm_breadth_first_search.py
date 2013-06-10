import random

def breadthFirstSearch(rootNode, val):
  searchNodes = [rootNode]

  while (len(searchNodes) > 0):
    node = searchNodes.pop(0)

    # check if this node matches
    data = node.getData()
    if (data['val'] == val):
      return node

    # add the child nodes to the array to search
    nodes = node.getChildNodes()
    for i in range(0, len(nodes)):
      searchNodes.append(nodes[i])

  return None

class Edge:
  def setTarget(self, target):
    self._target = target

  def getTarget(self):
    return self._target


class Node:
  def __init__(self, data):
    self._edges = []
    self._data = data

  def getData(self):
    return self._data

  def addChild(self, child):
    edge = Edge()
    edge.setTarget(child)
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

missingNodes = 0
for i in range(0, 1000):
  idx = random.randint(0, len(nodes) - 1)
  node = nodes[idx]
  val = node.getData()['val']
  searchNode = breadthFirstSearch(nodes[0], val)
  if searchNode != node:
    missingNodes += 1

print "Finished search, missing nodes:", missingNodes