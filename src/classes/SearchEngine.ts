import Trie from "./Trie";
import MaxHeap from "./MaxHeap";

export default class SearchEngine {
  private trie: Trie;

  constructor() {
    this.trie = new Trie();
  }

  
  insert(name: string, popularity: number): void {
    this.trie.insert(name, popularity);
  }

  // Metodo para buscar los mas populares, recibe la query desde el componente
  // que le da el prefijo y el numeor de elementos mas populares q bsucar
  searchTopK(
    prefix: string,
    k: number
  ): { name: string; popularity: number }[] {
    //Buscar todos los productos que coincidan con el prefijo
    const products = this.trie.searchByPrefix(prefix);

    //no hay resultados, retornar array vacío
    if (products.length === 0) return [];

    //Crear un MaxHeap con los productos encontrados
    const heap = new MaxHeap();
    for (const product of products) {
      heap.push(product);
    }

    // retornar los Top K
    return heap.topK(k);
  }
}
