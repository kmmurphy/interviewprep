#import <Foundation/Foundation.h>

@interface Node : NSObject
- (id)initWithData:(NSDictionary*)data;

- (void)setParent:(Node*)parent;
- (Node*)getParent;

- (void)addChild:(Node*)child;
- (NSArray*)getChildNodes;

- (NSDictionary*)getData;
@end

@interface Edge : NSObject
- (id)initWithTarget:(Node*)node;
- (Node*)getTarget;
@end

@implementation Node {
  NSMutableArray *_edges;
  NSDictionary *_data;
  Node* _parent;
}

- (id)initWithData:(NSDictionary*)data {
  self = [super init];

  if (self) {
    _edges = [NSMutableArray arrayWithCapacity:0];
    _data = data;
    _parent = nil;
  }

  return self;
}

- (void)setParent:(Node*)parent {
  _parent = parent;
}

- (Node*)getParent {
  return _parent;
}

- (void)addChild:(Node*)child {
  Edge* edge = [[Edge alloc] initWithTarget:child];
  [child setParent:self];
  [_edges addObject:edge];
}

- (NSArray*)getChildNodes {
  int numChildren = [_edges count];

  NSMutableArray* children = [NSMutableArray arrayWithCapacity:numChildren];
  for (int i = 0; i < numChildren; i++) {
    [children addObject:[[_edges objectAtIndex:i] getTarget]];
  }

  return children;
}

- (NSDictionary*)getData {
  return _data;
}
@end

@implementation Edge {
 Node *_target;
}

- (id)initWithTarget:(Node*)node {
  self = [super init];

  if (self) {
    _target = node;
  }

  return self;
}

- (Node*)getTarget {
  return _target;
}
@end

int getValueForNode(Node* node) {
  NSDictionary* dict = [node getData];
  NSNumber* val = [dict objectForKey:@"val"];
  return [val intValue];
}

Node* breadthFirstSearch(Node* rootNode, int searchVal) {
  NSMutableArray* nodes = [NSMutableArray arrayWithCapacity:1];
  [nodes addObject:rootNode];

  while ([nodes count] > 0) {
    Node* node = [nodes objectAtIndex:0];
    [nodes removeObjectAtIndex:0];

    int val = getValueForNode(node);
    if (val == searchVal) {
      return node;
    }

    NSArray* childNodes = [node getChildNodes];
    for (id child in childNodes) {
      [nodes addObject:child];
    }
  }

  return nil;
}

/**
 * Run the thing
 */
int main (int argc, const char * argv[]) {
  NSLog(@"Breadth first searching");
  int i;

  // Create the nodes to search
  int numNodes = 1000;
  NSMutableArray* nodes = [NSMutableArray arrayWithCapacity:numNodes];

  for (i = 0; i < numNodes; i++) {
    NSMutableDictionary* data = [NSMutableDictionary dictionary];
    [data setObject:[NSNumber numberWithInt:i] forKey:@"val"];
    Node* node = [[Node alloc] initWithData:data];

    if (i > 0) {
      int idx = arc4random() % i;
      Node* parent = [nodes objectAtIndex:idx];
      [parent addChild:node];
    }

    [nodes addObject:node];
  }

  // Pick a node at random and search for it
  int missingNodes = 0;
  for (i = 0; i < 1000; i ++) {
    int idx = arc4random() % numNodes;
    Node* node = [nodes objectAtIndex:idx];
    int val = getValueForNode(node);

    Node* searchNode = breadthFirstSearch([nodes objectAtIndex:0], val);
    if (searchNode != node) {
      missingNodes++;
    }
  }

  NSLog(@"Finished searching for nodes, %d not found", missingNodes);

  return 0;
}