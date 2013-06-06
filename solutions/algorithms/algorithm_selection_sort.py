import random

# Basic selection sort
def selectionSort(arr):
  newArr = arr[:]
  listLen = len(arr)

  for i in range(0, listLen - 1):
    lowestIdx = i
    lowestVal = newArr[i]

    # Find the lowest val
    for j in range(i + 1, listLen):
      if newArr[j] < lowestVal:
        lowestIdx = j
        lowestVal = newArr[j]

    if i != j:
      temp = newArr[i]
      newArr[i] = newArr[lowestIdx]
      newArr[lowestIdx] = temp

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
sortedArr = selectionSort(arr)

# Verify that the arrays match
listsMatch = compareArrays(validationArr, sortedArr)
if listsMatch:
  print "THE LISTS MATCH"