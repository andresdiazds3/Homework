class DoublyNode {
    value: any
    next: DoublyNode | null;
    prev: DoublyNode | null;

    constructor(value: any){
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

export default DoublyNode;