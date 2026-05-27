import TrieNode from "./TrieNode";
import Song from "./Song";

export default class Trie {
  root: TrieNode;

  // Crea el nodo raíz del trie.
  constructor() {
    this.root = new TrieNode();
  }

  // Inserta una canción usando su nombre como llave de búsqueda.
  insert(song: Song) {
    let current = this.root;
    for (const char of song.name.toLowerCase()) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }
      current = current.children.get(char)!;
    }
    current.isEndOfWord = true;
    current.song = song;
  }

  // Busca todas las canciones que empiezan con el prefijo escrito.
  searchByPrefix(prefix: string): Song[] {
    let current = this.root;
    for (const char of prefix.toLowerCase()) {
      if (!current.children.has(char)) return [];
      current = current.children.get(char)!;
    }
    const results: Song[] = [];
    this.collect(current, results);
    return results;
  }

  // Recorre el subárbol para juntar todas las canciones que cuelgan del prefijo.
  private collect(node: TrieNode, results: Song[]) {
    if (node.isEndOfWord && node.song) results.push(node.song);
    for (const child of node.children.values()) {
      this.collect(child, results);
    }
  }
}

