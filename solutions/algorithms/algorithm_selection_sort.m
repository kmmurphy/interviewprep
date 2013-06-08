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
 * Simple selection sort
 */
NSMutableArray* selectionSort(NSArray* array) {
  NSMutableArray *sortedArray = [NSMutableArray arrayWithArray:array];

  int len = [sortedArray count];
  for (int i = 0; i < len; i++) {
    int lowestIdx = i;
    int lowestVal = [[sortedArray objectAtIndex:i] intValue];

    for (int j = i + 1; j < len; j++) {
      int checkVal = [[sortedArray objectAtIndex:j] intValue];
      if (checkVal < lowestVal) {
        lowestVal = checkVal;
        lowestIdx = j;
      }
    }

    if (i != lowestIdx) {
      swapItems(sortedArray, i, lowestIdx);
    }
  }

  return sortedArray;
}

/**
 * Compare the arrays and make sure all values match
 */
BOOL compareArrays(NSMutableArray* array1, NSMutableArray *array2) {
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
  NSMutableArray *arr = createArray(1000, 0, 10000);
  NSMutableArray *verificationArr = getSortedArray(arr);
  NSMutableArray *sortedArr = selectionSort(arr);

  BOOL sortWorked = compareArrays(sortedArr, verificationArr);
  if (sortWorked) {
    NSLog(@"The sort worked!");
  } else {
    NSLog(@"THE SORT FAILED");
  }

  return 0;
}