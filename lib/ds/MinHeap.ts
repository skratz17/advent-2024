export class MinHeap {
  private heap: number[];

  constructor() {
    this.heap = [];
  }

  public insert(value: number): void {
    this.heap.push(value);
    let index = this.heap.length - 1;
    let parentIndex = this.getParentIndex(index);
    while(index !== 0 && parentIndex !== undefined && this.heap[parentIndex] > this.heap[index]) {
      this.swap(index, parentIndex);
      index = parentIndex;
      parentIndex = this.getParentIndex(index);
    }
  }

  public removeMin(): number {
    const min = this.heap.shift();
    if(min === undefined) {
      throw new Error('heap was empty');
    }

    if(this.heap.length > 0) {
      const leaf = this.heap.pop()!;
      this.heap.unshift(leaf);
      let index = 0;
      let swapIndex = this.getLeftChildIndex(index);
      while(swapIndex !== undefined) {
        swapIndex = this.heap[swapIndex] > this.heap[swapIndex + 1] ? swapIndex + 1 : swapIndex;
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
    this.heap[indexA] = this.heap[indexB];
    this.heap[indexB] = aVal;
  }
}