package main

import "fmt"
import "math/rand"
import "time"
import "sort"

type Sequence []int

// Methods required by sort.Interface.
func (s Sequence) Len() int {
    return len(s)
}
func (s Sequence) Less(i, j int) bool {
    return s[i] < s[j]
}
func (s Sequence) Swap(i, j int) {
    s[i], s[j] = s[j], s[i]
}

// Bubble sort
func bubbleSort(arr Sequence) Sequence {
  newArr := make(Sequence, len(arr))
  copy(newArr, arr)
  arrLen := len(newArr)

  swapped := true
  for swapped {
    swapped = false
    for i := 0; i < arrLen - 1; i++ {
      if newArr[i + 1] < newArr[i] {
        temp := newArr[i]
        newArr[i] = newArr[i + 1]
        newArr[i + 1] = temp
        swapped = true
      }
    }
  }

  return newArr
}

// Create an array of a specified length with min and max range
func createArray(len, min, max int) Sequence {
  rand.Seed(time.Now().Unix())
  diff := max - min
  var arr Sequence = make(Sequence, len);
  for i := 0; i < len; i++ {
    arr[i] = rand.Int() % diff + min
  }
  return arr
}

// Create a sorted copy of an array using internal methods
func getSortedArray(arr Sequence) Sequence {
  newArr := make(Sequence, len(arr))
  copy(newArr, arr)
  sort.Sort(newArr)
  return newArr
}

// Compare 2 arrays
func compareArrays(arr1, arr2 Sequence) bool {
  arrLen := len(arr1)
  if arrLen != len(arr2) {
    fmt.Println("The array lengths do not match")
    return false
  }

  for i := 0; i < arrLen; i++ {
    if arr1[i] != arr2[i] {
      fmt.Println("The arrays did not match at index", i)
      return false
    }
  }

  return true
}

// Run the thing
func main() {
  arr := createArray(1000, 0, 10000)
  verificationArr := getSortedArray(arr)
  sortedArr := bubbleSort(arr)

  isSorted := compareArrays(verificationArr, sortedArr)
  if isSorted {
    fmt.Println("The sort worked!")
  } else {
    fmt.Println("THE SORT FAILED")
  }
}