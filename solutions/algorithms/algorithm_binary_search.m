#import <Foundation/Foundation.h>

/**
 * Create the array of sorted random numbers
 */
NSArray* createSortedArray(int len, int min, int max) {
  NSMutableArray *arr = [NSMutableArray arrayWithCapacity:len];
  int diff = max - min;

  for (int i = 0; i < len; i++) {
    NSNumber *number = [NSNumber numberWithInt:min + arc4random() % diff];
    [arr insertObject:number atIndex:i];
  }

  NSSortDescriptor *sorter = [NSSortDescriptor sortDescriptorWithKey:@"self" ascending:YES];
  [arr sortUsingDescriptors:[NSArray arrayWithObject:sorter]];
  return arr;
}

/**
 * Binary search the array for a value
 */
int binarySearch(NSArray* array, int value) {
  int start = 0;
  int end = [array count] - 1;

  while (true) {
    if (end < start) {
      return -1;
    }

    int mid = ((end - start) / 2) + start;
    int midVal = [[array objectAtIndex:mid] intValue];

    if (midVal == value) {
      return mid;
    } else if (value < midVal) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
}

/**
 * Run the thing
 */
int main (int argc, const char * argv[]) {
  NSArray *arr = createSortedArray(1000, 0, 10000);
  int len = [arr count];

  int missingItems = 0;
  for (int i = 0; i < 1000; i++) {
    int idx = arc4random() % len;
    int val = [[arr objectAtIndex:idx] intValue];
    int searchIdx = binarySearch(arr, val);
    if (searchIdx == -1 || [[arr objectAtIndex:searchIdx] intValue] != val) {
      missingItems++;
    }
  }

  if (missingItems == 0) {
    NSLog(@"All items were found");
  } else {
    NSLog(@"%d items were missing", missingItems);
  }

  return 0;
}