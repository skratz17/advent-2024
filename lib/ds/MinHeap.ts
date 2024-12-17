interface HeapNode<T> {
  key: string;
  data: T;
  value: number;
}

export class MinHeap<T> {
  public heap: HeapNode<T>[];
  public map: Record<string, number>; 

  constructor() {
    this.heap = [];
    this.map = {};
  }

  public insert(node: HeapNode<T>): void {
    this.heap.push(node);
    let index = this.heap.length - 1;
    this.map[node.key] = index;
    let parentIndex = this.getParentIndex(index);
    while(index !== 0 && parentIndex !== undefined && this.heap[parentIndex].value > this.heap[index].value) {
      this.swap(index, parentIndex);
      index = parentIndex;
      parentIndex = this.getParentIndex(index);
    }
  }

  public removeMin(): HeapNode<T> {
    const min = this.heap.shift();
    if(min.key === '[139,3]W') {
      console.log('DELETING: ', min.key);
    }
    delete this.map[min.key];
    if(min === undefined) {
      throw new Error('heap was empty');
    }

    if(this.heap.length > 0) {
      const leaf = this.heap.pop()!;
      this.heap.unshift(leaf);
      let index = 0;
      let swapIndex = this.getLeftChildIndex(index);
      while(swapIndex !== undefined) {
        swapIndex = this.heap[swapIndex].value > this.heap[swapIndex + 1]?.value ? swapIndex + 1 : swapIndex;
        if(this.heap[index] <= this.heap[swapIndex]) {
          break;
        }
        this.swap(index, swapIndex);
        index = swapIndex;
        swapIndex = this.getLeftChildIndex(index);
      }
    }

    return min;
  }

  public decreaseKey(key: string, value: number) {
    let index = this.map[key];
    this.heap[index].value = value;
    let parentIndex = this.getParentIndex(index);
    while(index !== 0 && parentIndex !== undefined && this.heap[parentIndex].value > this.heap[index].value) {
      this.swap(index, parentIndex);
      index = parentIndex;
      parentIndex = this.getParentIndex(index);
    }
  }

  public size(): number {
    return this.heap.length;
  }

  private getParentIndex(index: number): number | undefined {
    if(index === 0) return undefined;
    return Math.floor((index - 1) / 2);
  }

  private getLeftChildIndex(index: number): number | undefined {
    const leftChildIndex = (index * 2) + 1;
    if(leftChildIndex >= this.heap.length) return undefined;
    return leftChildIndex;
  }

  private swap(indexA: number, indexB: number) {
    const aVal = this.heap[indexA];
    const bVal = this.heap[indexB];
    this.heap[indexA] = bVal;
    this.heap[indexB] = aVal;
    if(aVal.key === '[139,3]W') {
      console.log('UPDATING TO: ', indexB);
    } else if(bVal.key === '[139,3]W') {
      console.log('UPDATING TO: ', indexA);
    }
    this.map[aVal.key] = indexB;
    this.map[bVal.key] = indexA;
  }
}