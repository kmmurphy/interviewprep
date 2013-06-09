#import <Foundation/Foundation.h>

@interface Shuffler : NSObject
- (void)addChar:(NSString*)str;
- (NSString*)getShuffledString;
- (NSString*)getUnshuffledString;
@end

@implementation Shuffler {
  NSMutableArray *_unshuffledChars;
  NSMutableArray *_shuffledChars;
}

- (id)init {
  self = [super init];

  if (self) {
    _unshuffledChars = [NSMutableArray arrayWithCapacity:0];
    _shuffledChars = [NSMutableArray arrayWithCapacity:0];
  }

  return self;
}

- (void)addChar:(NSString*)str {
  [_unshuffledChars addObject:str];

  int len = [_shuffledChars count];
  int index = arc4random() % (len + 1);

  if (index == len) {
    [_shuffledChars addObject:str];
  } else {
    [_shuffledChars addObject:[_shuffledChars objectAtIndex:index]];
    [_shuffledChars replaceObjectAtIndex:index withObject:str];
  }
}

- (NSString*)getShuffledString {
  int len = [_shuffledChars count];
  NSMutableString* outputString = [NSMutableString stringWithCapacity:len];
  for (int i = 0; i < len; i++) {
    NSString *chunk = [_shuffledChars objectAtIndex:i];
    [outputString appendString:chunk];
  }
  return outputString;
}

- (NSString*)getUnshuffledString {
  int len = [_unshuffledChars count];
  NSMutableString* outputString = [NSMutableString stringWithCapacity:len];
  for (int i = 0; i < len; i++) {
    NSString *chunk = [_unshuffledChars objectAtIndex:i];
    [outputString appendString:chunk];
  }
  return outputString;
}
@end

/**
 * Run the thing
 */
int main (int argc, const char * argv[]) {
  NSString *inputString = @"abcdefghijklmnopqrstuvwxyz";
  Shuffler *shuffler = [[Shuffler alloc] init];

  int len = [inputString length];
  for (int i = 0; i < len; i++) {
    int ascii = [inputString characterAtIndex:i];
    NSString *newStr = [NSString stringWithFormat:@"%c", ascii];
    [shuffler addChar:newStr];
  }

  NSLog(@"Unshuffled String: %@", [shuffler getUnshuffledString]);
  NSLog(@"Shuffled String: %@", [shuffler getShuffledString]);
  return 0;
}