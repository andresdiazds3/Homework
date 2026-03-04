import Node from "./NodeLinkedList"

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
      this.tail = newNode
    } else {
      this.tail!.next = newNode;
      this.tail = newNode
    }
    
    this.length++;
  }
  
  peek(value:any, current = this.head){
    while(current){
        if(current.value.id === value){
            return current;
        }
        current = current.next;
    }
  }

  remove(value: any) {
  if (!this.head) return null;

  // 🔹 eliminar head
  if (this.head.value.id === value) {
    this.head = this.head.next;

    if (!this.head) {
      this.tail = null;
    }

    this.length--;
    return; 
  }

  let current = this.head;

  while (current.next && current.next.value.id !== value) {
    current = current.next;
  }

  if (current.next) {
    current.next = current.next.next;

    if (!current.next) {
      this.tail = current;
    }

    this.length--;
  }
}
    
  size(){
    return this.length;
  }
  
}