import Node from "./node";

export class LinkedList {
  head: Node | null;
  tail: Node | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value: any) {
    const newNode = new Node(value);

    // lista vacía
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // conectar al final
      this.tail!.next = newNode;
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
