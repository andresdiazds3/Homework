import TrieNode from "./TrieNode";

export default class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(name: string, popularity: number) {
    let current = this.root;
    for (const char of name.toLowerCase()) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }
      current = current.children.get(char)!;
    }
    current.isEndOfWord = true;
    current.product = { name, popularity };
  }

  searchByPrefix(prefix: string): { name: string; popularity: number }[] {
    let current = this.root;
    for (const char of prefix.toLowerCase()) {
      if (!current.children.has(char)) return [];
      current = current.children.get(char)!;
    }
    const results: { name: string; popularity: number }[] = [];
    this.collect(current, results);
    return results;
  }

  private collect(node: TrieNode, results: { name: string; popularity: number }[]) {
    if (node.isEndOfWord && node.product) results.push(node.product);
    for (const child of node.children.values()) {
      this.collect(child, results);
    }
  }
}

