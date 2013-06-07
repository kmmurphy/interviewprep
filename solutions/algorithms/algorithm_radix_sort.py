import random

# Basic radix sort
def radixSort(arr):
  newArr = arr[:]
  arrLen = len(newArr)

  largestPowerOfTen = 1

  for i in range(0, arrLen):
    while largestPowerOfTen <= newArr[i]:
      largestPowerOfTen *= 10

  currentPowerOfTen = 1

  while currentPowerOfTen < largestPowerOfTen:
    buckets = []

    # create the buckets
    for i in range(0, 10):
      buckets.append([])

    # put the numbers in the buckets
    for i in range(0, arrLen):
      num = int(newArr[i] / currentPowerOfTen)
      buckets[num % 10].append(newArr[i])

    # remerge the buckets
    idx = 0
    for i in range(0, 10):
      for j in range(0, len(buckets[i])):
        newArr[idx] = buckets[i][j]
        idx += 1

    currentPowerOfTen *= 10

  return newArr

# Create an array to sort
def createArrayToSort(len, min, max):
  arr = []
  for i in range(0, len):
    arr.append(random.randint(min, max))
  return arr

# Compare two arrays and make sure they match
def compareArrays(arr1, arr2):
  len1 = len(arr1)
  len2 = len(arr2)
  if len1 != len2:
    print "The list lengths did not match"
    return False
  for i in range(0, len1):
    if arr1[i] != arr2[i]:
      print str.format("The lists did not match at index {0}", i)
      return False
  return True

# Create the test array
arr = createArrayToSort(1000, 0, 10000)

# Clone and sort the test array using the built in functionality
validationArr = sorted(arr)

# Sort the array using the custom sort
sortedArr = radixSort(arr)

# Verify that the arrays match
listsMatch = compareArrays(validationArr, sortedArr)
if listsMatch:
  print "THE LISTS MATCH"