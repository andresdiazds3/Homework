import Song from "./Song";

class TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;
  song: Song | null;

  // Guarda una sola rama del trie y la canción completa cuando termina una palabra.
  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
    this.song = null;
  }
}

export default TrieNode;