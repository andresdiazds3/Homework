import DoublyNode from "./DoublyNode";

export class CircularDoubleLinkedList {
  head: DoublyNode | null;
  tail: DoublyNode | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value: any) {
    const newNode = new DoublyNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      newNode.next = newNode;
      newNode.prev = newNode;
    } else {
      newNode.prev = this.tail;
      newNode.next = this.head;

      this.tail!.next = newNode;
      this.head.prev = newNode;

      this.tail = newNode;
    }

    this.length++;
  }

  
  remove(value: any) {
    if (!this.head) return null;

    let current = this.head;

    do {
      if (current.value.id === value) {

        // único nodo
        if (this.head === this.tail) {
          this.head = null;
          this.tail = null;
        }

        // eliminar la cabeza de la lista
        else if (current === this.head) {
          this.head = this.head.next;
          this.head!.prev = this.tail;
          this.tail!.next = this.head;
        }

        // eliminar la cola de la lista
        else if (current === this.tail) {
          this.tail = this.tail.prev;
          this.tail!.next = this.head;
          this.head!.prev = this.tail;
        }

        // eliminar un nodo intermedio 
        else {
          current.prev!.next = current.next;
          current.next!.prev = current.prev;
        }

        this.length--;
        return;
      }

      current = current.next!;
    } while (current !== this.head);
  }

  size() {
    return this.length;
  }


}