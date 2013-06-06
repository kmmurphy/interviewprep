import math
import random

# Basic merge sort
def mergeSort(arr):
  listLen = len(arr)

  if listLen <= 1:
    return arr

  # split the lists
  listMid = int(listLen / 2)
  arr1 = mergeSort(arr[0:listMid])
  arr2 = mergeSort(arr[listMid:listLen])

  newArr = []
  listLen1 = listMid
  listLen2 = listLen - listMid
  idx1 = 0
  idx2 = 0
  while idx1 < listLen1 or idx2 < listLen2:
    if idx1 >= listLen1:
      newArr.append(arr2[idx2])
      idx2 += 1
    elif idx2 >= listLen2:
      newArr.append(arr1[idx1])
      idx1 += 1
    elif arr1[idx1] <= arr2[idx2]:
      newArr.append(arr1[idx1])
      idx1 += 1
    else:
      newArr.append(arr2[idx2])
      idx2 += 1

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
      print "The lists did not match at index ", i
      return False
  return True

# Create the test array
arr = createArrayToSort(1000, 0, 10000)

# Clone and sort the test array using the built in functionality
validationArr = sorted(arr)

# Sort the array using the custom sort
sortedArr = mergeSort(arr)

# Verify that the arrays match
listsMatch = compareArrays(validationArr, sortedArr)
if listsMatch:
  print "THE LISTS MATCH"