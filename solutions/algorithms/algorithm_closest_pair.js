var MAX_DISTANCE = 1000 * 1000 + 1

function Point(x, y) {
  this._x = x
  this._y = y
}

Point.prototype.getX = function () {
  return this._x
}

Point.prototype.getY = function () {
  return this._y
}

Point.prototype.distanceFrom = function (pt) {
  var xDist = pt.getX() - this._x
  var yDist = pt.getY() - this._y
  return xDist * xDist + yDist * yDist
}

function Segment(pt1, pt2, dist) {
  this._pts = [pt1, pt2]
  this._dist = dist || pt1.distanceFrom(pt2)
}

Segment.prototype.getPoints = function () {
  return this._pts
}

Segment.prototype.getDistance = function () {
  return this._dist
}

function calculateClosest(sortedPoints) {
  if (sortedPoints.length <= 1) return null
  if (sortedPoints.length == 2) return new Segment(sortedPoints[0], sortedPoints[1])

  // subdivide the list
  var mid = Math.floor(sortedPoints.length / 2)
  var midX = sortedPoints[mid - 1].getX()
  var dl = calculateClosest(sortedPoints.slice(0, mid))
  var dr = calculateClosest(sortedPoints.slice(mid, sortedPoints.length))

  // start finding the actual min
  var dlr
  if (!dl) dlr = dr
  else if (!dr) dlr = dl
  else {
    dlr = dl.getDistance() < dr.getDistance() ? dl : dr
  }

  // start with the right-most left point and work backwards
  var currentMin = dlr ? dlr.getDistance() : MAX_DISTANCE
  var rightMax = sortedPoints.length - mid > 6 ? mid + 6 : sortedPoints.length - 1
  for (i = mid - 1; i >= 0; i--) {
    for (j = mid; j <= rightMax; j++) {
       if (sortedPoints[j].getX() - midX > currentMin) {
         rightMax = j - 1
         continue
       }
      var dist = sortedPoints[j].distanceFrom(sortedPoints[i])
      if (dist < currentMin) {
        dlr = new Segment(sortedPoints[i], sortedPoints[j], dist)
        currentMin = dist
      }
    }
  }

  return dlr
}

for (var x = 0; x < 1000; x++) {
  // create the array of points to search
  var points = []
  for (var i = 0; i < 20; i++) {
    var pt = new Point(Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000))
    points.push(pt)
  }

  // create a sorted array of the points ( O(n log n) )
  var sortedPoints = [].concat(points)
  sortedPoints.sort(function(a, b) {
    return a.getX() - b.getX()
  })

  // brute force the best solution
  var closestPoints = null
  var bestOverallDistance = MAX_DISTANCE
  for (var i = 0; i < sortedPoints.length - 1; i++) {
    var pt1 = sortedPoints[i]
    for (var j = i + 1; j < sortedPoints.length; j++) {
      var pt2 = sortedPoints[j]
      var dist = pt2.distanceFrom(pt1)
      if (dist < bestOverallDistance) {
        bestOverallDistance = dist
        closestPoints = [pt1, pt2]
      }
    }
  }

  var bruteForce = closestPoints[0].distanceFrom(closestPoints[1])
  var calculated = calculateClosest(sortedPoints).getPoints()
  for (i = 0; i < bruteForce.length; i++) {
    if (bruteForce[i] != calculated[i]) {
      throw new Error("Calculations did not match")
    }
  }
}
console.log("Closest pair algorithm worked across 1000 runs!")
