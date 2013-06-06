import math
import random

# Basic quick sort
def quickSort(arr, start=-1, end=-1):
  if start < 0:
    start = 0
    end = len(arr) - 1
  if start >= end:
    return arr

  # pick a pivot
  pivotIdx = int((end - start) / 2) + start
  pivotVal = arr[pivotIdx]

  # move the pivot to the end
  swap(arr, pivotIdx, end)

  # move everything left of the pivot to the beginning of the range
  pivotIdx = start
  for i in range(start, end):
    if arr[i] < pivotVal:
      swap(arr, i, pivotIdx)
      pivotIdx += 1

  # move the pivot into position
  swap(arr, pivotIdx, end)

  # do the same thing with the ranges left and right of the pivot
  quickSort(arr, start, pivotIdx - 1)
  quickSort(arr, pivotIdx + 1, end)

  return arr

def swap(arr, idx1, idx2):
  if idx1 == idx2:
    return
  temp = arr[idx1]
  arr[idx1] = arr[idx2]
  arr[idx2] = temp

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
sortedArr = quickSort(arr)

# Verify that the arrays match
listsMatch = compareArrays(validationArr, sortedArr)
if listsMatch:
  print "THE LISTS MATCH"