//Function for creating a linked list

class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }
  
  class LinkedList {
    constructor() {
      this.head = null;
      this.tail = null;
      this.length = 0;
    }
  
    append(value) {
      const newNode = new Node(value);
      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        this.tail.next = newNode;
        this.tail = newNode;
      }
      this.length++;
      return this;
    }
  
    prepend(value) {
      const newNode = new Node(value);
      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        newNode.next = this.head;
        this.head = newNode;
      }
      this.length++;
      return this;
    }
  
    pop() {
      if (!this.head) return undefined;
  
      let current = this.head;
      let newTail = current;
  
      while (current.next) {
        newTail = current;
        current = current.next;
      }
  
      this.tail = newTail;
      this.tail.next = null;
      this.length--;
  
      if (this.length === 0) {
        this.head = null;
        this.tail = null;
      }
      return current;
    }
  
    shift() {
      if (!this.head) return undefined;
      
      const oldHead = this.head;
      this.head = oldHead.next;
      this.length--;
  
      if (this.length === 0) {
        this.tail = null;
      }
      return oldHead;
    }
  
    insert(index, value) {
      if (index < 0 || index > this.length) return false;
      if (index === 0) return !!this.prepend(value);
      if (index === this.length) return !!this.append(value);
  
      const newNode = new Node(value);
      const prevNode = this.get(index - 1);
      newNode.next = prevNode.next;
      prevNode.next = newNode;
      this.length++;
      return true;
    }
  
    get(index) {
      if (index < 0 || index >= this.length) return null;
  
      let current = this.head;
      let counter = 0;
      while (counter !== index) {
        current = current.next;
        counter++;
      }
      return current;
    }
  
    remove(index) {
      if (index < 0 || index >= this.length) return undefined;
      if (index === 0) return this.shift();
      if (index === this.length - 1) return this.pop();
  
      const prevNode = this.get(index - 1);
      const removedNode = prevNode.next;
      prevNode.next = removedNode.next;
      this.length--;
      return removedNode;
    }
  
    reverse() {
      let current = this.head;
      this.head = this.tail;
      this.tail = current;
      let prev = null;
      let next = null;
      while (current) {
        next = current.next;
        current.next = prev;
        prev = current;
        current = next;
      }
      return this;
    }
  
    print() {
      const arr = [];
      let current = this.head;
      while (current) {
        arr.push(current.value);
        current = current.next;
      }
      console.log(arr);
      return arr;
    }
  }
  
  // Example usage
  const list = new LinkedList();
  list.append(4);
  list.append(3);
  list.append(7);
  list.prepend(1);
  list.insert(2, 6);
  list.remove(3);
  list.reverse();
  list.print(); 
  