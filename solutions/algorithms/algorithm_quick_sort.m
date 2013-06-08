#import <Foundation/Foundation.h>

/**
 * Create the array of random numbers
 */
NSMutableArray* createArray(int len, int min, int max) {
  NSMutableArray *arr = [NSMutableArray arrayWithCapacity:len];
  int diff = max - min;

  for (int i = 0; i < len; i++) {
    NSNumber *number = [NSNumber numberWithInt:min + arc4random() % diff];
    [arr insertObject:number atIndex:i];
  }
  return arr;
}

/**
 * Copy and sort the array using native methods
 */
NSMutableArray* getSortedArray(NSArray* array) {
  NSMutableArray *sortedArray = [NSMutableArray arrayWithArray:array];
  NSSortDescriptor *sorter = [NSSortDescriptor sortDescriptorWithKey:@"self" ascending:YES];
  [sortedArray sortUsingDescriptors:[NSArray arrayWithObject:sorter]];
  return sortedArray;
}

/**
 * Swap 2 items in the array
 */
void swapItems(NSMutableArray* array, int idx1, int idx2) {
  if (idx1 == idx2) return;
  NSNumber *temp = [array objectAtIndex:idx1];
  [array replaceObjectAtIndex:idx1 withObject:[array objectAtIndex:idx2]];
  [array replaceObjectAtIndex:idx2 withObject:temp];
}

/**
 * Sort a chunk of the array
 */
void sortArrayChunk(NSMutableArray* array, int start, int end) {
  if (end - start <= 0) return;

  // pick the initial pivot
  int diff = end - start;
  int pivot = start + diff / 2;
  int pivotValue = [[array objectAtIndex:pivot] intValue];

  // move the pivot to the end
  swapItems(array, pivot, end);

  // move anything less than the pivot to the beginning of the list
  pivot = start;
  for (int i = start; i < end; i++) {
    if ([[array objectAtIndex:i] intValue] < pivotValue) {
      swapItems(array, i, pivot);
      pivot++;
    }
  }

  // move the pivot back into place
  swapItems(array, end, pivot);

  // sort the list on both sides of the pivot
  sortArrayChunk(array, start, pivot - 1);
  sortArrayChunk(array, pivot + 1, end);
}

/**
 * Simple quick sort
 */
NSArray* quickSort(NSArray* array) {
  NSMutableArray *sortedArray = [NSMutableArray arrayWithArray:array];
  sortArrayChunk(sortedArray, 0, [sortedArray count] - 1);
  return sortedArray;
}

/**
 * Compare the arrays and make sure all values match
 */
BOOL compareArrays(NSArray* array1, NSArray *array2) {
  int len1 = [array1 count];
  int len2 = [array2 count];
  if (len1 != len2) {
    NSLog(@"The array lengths do not match");
    return NO;
  }

  NSNumber *num1;
  NSNumber *num2;
  for (int i = 0; i < len1; i++) {
    num1 = [array1 objectAtIndex:i];
    num2 = [array2 objectAtIndex:i];
    if ([num1 intValue] != [num2 intValue]) {
      NSLog(@"The array items do not match at index %d", i);
      return NO;
    }
  }

  return YES;
}

/**
 * Run the thing
 */
int main (int argc, const char * argv[]) {
  NSArray *arr = createArray(1000, 0, 10000);
  NSArray *verificationArr = getSortedArray(arr);
  NSArray *sortedArr = quickSort(arr);

  BOOL sortWorked = compareArrays(sortedArr, verificationArr);
  if (sortWorked) {
    NSLog(@"The sort worked!");
  } else {
    NSLog(@"THE SORT FAILED");
  }

  return 0;
}