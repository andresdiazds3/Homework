export default class MaxHeap {
  private heap: { name: string; popularity: number }[] = [];

  push(product: { name: string; popularity: number }) {
    this.heap.push(product);
    this.percolateUp();
  }

  pop(): { name: string; popularity: number } | undefined {
    if (this.heap.length === 0) return undefined;
    const n = this.heap.length;
    [this.heap[0], this.heap[n - 1]] = [this.heap[n - 1], this.heap[0]];
    const max = this.heap.pop();
    this.percolateDown(0);
    return max;
  }

  topK(k: number): { name: string; popularity: number }[] {
    const copy = new MaxHeap();
    copy.heap = [...this.heap];
    const results = [];
    for (let i = 0; i < k && copy.heap.length > 0; i++) {
      const item = copy.pop();
      if (item) results.push(item);
    }
    return results;
  }

  private percolateUp() {
    let curr = this.heap.length - 1;
    while (curr > 0) {
      const parent = Math.floor((curr - 1) / 2);
      if (this.heap[curr].popularity > this.heap[parent].popularity) {
        [this.heap[curr], this.heap[parent]] = [this.heap[parent], this.heap[curr]];
        curr = parent;
      } else break;
    }
  }

  private percolateDown(index: number) {
    let curr = index;
    while (2 * curr + 1 < this.heap.length) {
      const left = 2 * curr + 1;
      const right = 2 * curr + 2;
      const maxChild =
        right < this.heap.length &&
        this.heap[right].popularity > this.heap[left].popularity
          ? right : left;
      if (this.heap[maxChild].popularity > this.heap[curr].popularity) {
        [this.heap[curr], this.heap[maxChild]] = [this.heap[maxChild], this.heap[curr]];
        curr = maxChild;
      } else break;
    }
  }
}