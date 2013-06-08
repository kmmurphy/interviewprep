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
 * Simple radix sort
 */
NSArray* radixSort(NSArray* array) {
  int i, val;
  int len = [array count];
  NSMutableArray *outputArray = [NSMutableArray arrayWithArray:array];

  // find the power of ten that's greater than the largest item
  int greaterPowerOfTen = 1;
  for (i = 0; i < len; i++) {
    val = [[array objectAtIndex:i] intValue];
    while (greaterPowerOfTen <= val) greaterPowerOfTen *= 10;
  }

  int currentPowerOfTen = 1;
  while (currentPowerOfTen < greaterPowerOfTen) {
    // create the 10 buckets
    NSMutableArray *buckets = [NSMutableArray arrayWithCapacity:10];
    for (i = 0; i < 10; i++) {
      [buckets addObject:[NSMutableArray arrayWithCapacity:0]];
    }

    // allocate every number to a bucket
    for (i = 0; i < len; i++) {
      val = [[outputArray objectAtIndex:i] intValue];
      int base = val / currentPowerOfTen;
      int bucketIdx = base % 10;
      [[buckets objectAtIndex:bucketIdx] addObject:[outputArray objectAtIndex:i]];
    }

    // recomposite the buckets into the output array
    int idx = 0;
    for (i = 0; i < 10; i++) {
      NSMutableArray *bucket = [buckets objectAtIndex:i];
      int bucketLen = [bucket count];
      for (int j = 0; j < bucketLen; j++) {
        [outputArray replaceObjectAtIndex:idx withObject:[bucket objectAtIndex:j]];
        idx++;
      }
    }

    currentPowerOfTen *= 10;
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
  NSArray *sortedArr = radixSort(arr);

  BOOL sortWorked = compareArrays(sortedArr, verificationArr);
  if (sortWorked) {
    NSLog(@"The sort worked!");
  } else {
    NSLog(@"THE SORT FAILED");
  }

  return 0;
}