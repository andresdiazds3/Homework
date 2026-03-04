import DoublyNode from "./DoublyNode";

export class DoublyinkedList {
  head: DoublyNode| null;
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
    } else {
      this.tail!.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }

    this.length++;
  }

  peek(value: any, current = this.head) {
    while (current) {
      if (current.value.id === value) {
        return current;
      }
      current = current.next;
    }
  }

  remove(value: any) {
    if (!this.head) return null;

    let current : DoublyNode|null = this.head;

    while (current) {
      if (current.value.id === value) {
        // head
        if (current === this.head) {
          this.head = this.head.next;

          if (this.head) {
            this.head.prev = null;
          } else {
            this.tail = null;
          }
        }

        // tail
        else if (current === this.tail) {
          this.tail = this.tail.prev;
          this.tail!.next = null;
        }

        // medio
        else {
          if(current.prev) current.prev.next = current.next;
          if(current.next) current.next.prev = current.prev;
        }

        this.length--;
        return;
      }

      current = current.next;
    }
  }

  size() {
    return this.length;
  }

  print() {
    let current = this.head;
    let result = "";

    while (current) {
      result += current.value + " <-> ";
      current = current.next;
    }

    console.log(result + "null");
  }
}
