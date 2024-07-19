// Complete the methods below; they should work for all base cases.

// Prerequisite: Deep dive is needed in LRU before implementation and handling all edge cases.

// class LRUCache {
//     constructor(capacity) {
         // Your code here
//     }

//     get(key) {
         // Your code here
//     }

//     put(key, value) {
         // Your code here
//     }
// }

// const cache = new LRUCache(2);
// cache.put(1, 1);
// cache.put(2, 2);
// console.log(cache.get(1)); // Output: 1
// cache.put(3, 3);
// console.log(cache.get(2)); // Output: -1


class LRUCache {
    // Inner class to represent a node in the doubly linked list
    static Node = class {
        constructor(key, value) {
            this.key = key;
            this.value = value;
            this.prev = null;
            this.next = null;
        }
    }

    // Constructor to initialize the cache with a given capacity
    constructor(capacity) {
        this.capacity = capacity;
        this.count = 0; // curr size of the cache
        this.hm = new Map(); // HashMap to store key-node pairs
        // head and tail nodes to simplify add and remove nodes
        this.head = new LRUCache.Node(0, 0);
        this.tail = new LRUCache.Node(0, 0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    // utility methods

    // method to insert a node right after the head
    insertAtFront(node) {
        node.next = this.head.next;
        node.next.prev = node;
        this.head.next = node;
        node.prev = this.head;
    }

    // method to remove a node from the linked list
    remove(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    // method to get the value of the key if it exists in the cache
    get(key) {

        if (this.hm.has(key)) {
            const temp = this.hm.get(key);
            const val = temp.value;
            // Move this node to the front to make it recently used
            this.remove(temp);
            this.insertAtFront(temp);
            return val;
        }
        else {
            // the key does not exist in the cache
            return -1;
        }
    }

    // method to add a key-value pair to the cache
    put(key, value) {
        
        if (this.hm.has(key)) {

            // If key exists, update its value and insert it to the front
            const temp = this.hm.get(key);
            temp.value = value;
            this.hm.set(key, temp);
            this.remove(temp);
            this.insertAtFront(temp);
        } else {

            // If key do not exist, create a new node
            const node = new LRUCache.Node(key, value);
            this.hm.set(key, node);
            
            if (this.count < this.capacity) {
                // If cache is not full, just add the new node
                this.count++;
                this.insertAtFront(node);
            } 
            else {
                // If cache is full, remove the lru node
                this.hm.delete(this.tail.prev.key);
                this.remove(this.tail.prev);
                this.insertAtFront(node);
            }
        }
    }
}

// example

const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1));
cache.put(3, 3);
console.log(cache.get(2)); 