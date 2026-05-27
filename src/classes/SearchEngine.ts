import Trie from "./Trie";
import MaxHeap from "./MaxHeap";
import Song from "./Song";

export default class SearchEngine {
  private trie: Trie;

  // Crea la estructura que indexa las canciones para buscar por prefijo.
  constructor() {
    this.trie = new Trie();
  }

  // Inserta una canción completa en el trie.
  insert(song: Song): void {
    this.trie.insert(song);
  }

  // Busca las canciones que coinciden con el prefijo y devuelve las más populares.
  searchTopK(prefix: string, k: number): Song[] {
    // Busca todas las canciones que coinciden con el prefijo.
    const songs = this.trie.searchByPrefix(prefix);

    // Si no hay coincidencias, devuelve un arreglo vacío.
    if (songs.length === 0) return [];

    // Ordena las coincidencias por popularidad usando el heap.
    const heap = new MaxHeap();
    for (const song of songs) {
      heap.push(song);
    }

    // Devuelve solo las k canciones más populares.
    return heap.topK(k);
  }
}
