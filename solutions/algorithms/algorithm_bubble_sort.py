import random

def bubbleSort(arr):
  newArr = arr[:]
  listLen = len(arr)
  swapped = True
  while swapped:
    swapped = False
    for i in range(0, listLen - 1):
      if newArr[i] > newArr[i + 1]:
        temp = newArr[i]
        newArr[i] = newArr[i + 1]
        newArr[i + 1] = temp
        swapped = True
  return newArr

def createArrayToSort(len, min, max):
  arr = []
  for i in range(0, len):
    arr.append(random.randint(min, max))
  return arr

def compareArrays(arr1, arr2):
  len1 = len(arr1)
  len2 = len(arr2)
  if len1 != len2:
    print "The list lengths did not match"
    return False
  for i in range(0, len1):
    if arr1[i] != arr2[i]:
      print "The lists did not match at index " + i
      return False
  return True

arr = createArrayToSort(1000, 0, 10000)
validationArr = sorted(arr)
sortedArr = bubbleSort(arr)

listsMatch = compareArrays(validationArr, sortedArr)
if listsMatch:
  print "THE LISTS MATCH"