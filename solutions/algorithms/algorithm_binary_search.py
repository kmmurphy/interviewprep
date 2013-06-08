import random

# Search for the index for a value in the array
def binarySearch(arr, val):
  start = 0
  end = len(arr) - 1

  while (True):
    if (end < start):
      return -1
    mid = int((end - start) / 2) + start

    if (arr[mid] == val):
      return mid
    elif (arr[mid] > val):
      end = mid - 1
    else:
      start = mid + 1

# Create an array to search
def createSortedArray(len, min, max):
  arr = []
  for i in range(0, len):
    arr.append(random.randint(min, max))
  return sorted(arr)

# build the array to search
arr = createSortedArray(1000, 0, 10000)

# search the array 1000 times
missingCount = 0
for i in range(0, 1000):
  idx = random.randint(0, len(arr) - 1)
  val = arr[idx]
  searchIdx = binarySearch(arr, val)
  if (idx == -1 or arr[idx] != arr[searchIdx]):
    missingCount += 1

# output
if (missingCount == 0):
  print "All items were found"
else:
  print "Items were missing", missingCount