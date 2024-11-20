export default class Queue {
    length;
    head;
    tail;
    constructor() {
        this.head = this.tail = undefined;
        this.length = 0;
    }
    enqueue(item) {
        const node = { value: item };
        this.length++;
        if (!this.tail) {
            this.tail = this.head = node;
        }
        this.tail.next = node;
        this.tail.next;
    }
    deque() {
        if (!this.head) {
            return undefined;
        }
        this.length--;
        const head = this.head;
        this.head = this.head.next;
        head.next = undefined;
        return head.value;
    }
    peek() {
        return this.head?.value;
    }
}
