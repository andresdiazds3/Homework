class TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;
  product: { name: string; popularity: number } | null;

  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
    this.product = null;
  }
}

export default TrieNode;