import random

# Basic insertion sort
def insertionSort(arr):
  newArr = arr[:]
  listLen = len(arr)

  for i in range(1, listLen):
    j = i
    temp = newArr[i]
    while j > 0 and newArr[j - 1] > temp:
      newArr[j] = newArr[j - 1]
      j -= 1
    newArr[j] = temp

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
sortedArr = insertionSort(arr)

# Verify that the arrays match
listsMatch = compareArrays(validationArr, sortedArr)
if listsMatch:
  print "THE LISTS MATCH"