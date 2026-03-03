import DoublyNode from "./DoublyNode";

export class DoublyLinkedList {
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

    // lista vacía
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // conectar al final
      this.tail!.next = newNode;
      newNode.prev = this.tail
      this.tail = newNode;
    }

    this.length++;
  }

  size(){
    return this.length;
  }

  print() {
  let current = this.head;
  let result = "";

  while (current !== null) {
    result += current.value + " -> ";
    current = current.next;
  }

  result += "null";
  console.log(result);
}

}
