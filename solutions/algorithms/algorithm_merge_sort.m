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

void swapItems(NSMutableArray* array, int idx1, int idx2) {
  NSNumber *temp = [array objectAtIndex:idx1];
  [array replaceObjectAtIndex:idx1 withObject:[array objectAtIndex:idx2]];
  [array replaceObjectAtIndex:idx2 withObject:temp];
}

/**
 * Simple merge sort
 */
NSArray* mergeSort(NSArray* array) {
  int len = [array count];
  if (len <= 1) return array;

  int mid = len / 2;
  int arr1Len = mid;
  int arr2Len = len - mid;

  NSMutableArray *arr1 = [NSMutableArray arrayWithCapacity:arr1Len];
  NSMutableArray *arr2 = [NSMutableArray arrayWithCapacity:arr2Len];

  for (int i = 0; i < len; i++) {
    if (i < mid) [arr1 addObject:[array objectAtIndex:i]];
    else [arr2 addObject:[array objectAtIndex:i]];
  }

  NSArray *sortedArr1 = mergeSort(arr1);
  NSArray *sortedArr2 = mergeSort(arr2);
  NSMutableArray *outputArray = [NSMutableArray arrayWithCapacity:len];

  int arr1Ptr = 0;
  int arr2Ptr = 0;

  while (arr1Ptr < arr1Len || arr2Ptr < arr2Len) {
    if (arr1Ptr >= arr1Len) {
      [outputArray addObject:[sortedArr2 objectAtIndex:arr2Ptr]];
      arr2Ptr++;
    } else if (arr2Ptr >= arr2Len) {
      [outputArray addObject:[sortedArr1 objectAtIndex:arr1Ptr]];
      arr1Ptr++;
    } else if ([[sortedArr2 objectAtIndex:arr2Ptr] intValue] < [[sortedArr1 objectAtIndex:arr1Ptr] intValue]) {
      [outputArray addObject:[sortedArr2 objectAtIndex:arr2Ptr]];
      arr2Ptr++;
    } else {
      [outputArray addObject:[sortedArr1 objectAtIndex:arr1Ptr]];
      arr1Ptr++;
    }
  }

  return outputArray;
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
  NSArray *sortedArr = mergeSort(arr);

  BOOL sortWorked = compareArrays(sortedArr, verificationArr);
  if (sortWorked) {
    NSLog(@"The sort worked!");
  } else {
    NSLog(@"THE SORT FAILED");
  }

  return 0;
}