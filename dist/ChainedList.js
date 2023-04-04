"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainedList = void 0;
class ChainedListNode {
    constructor(value) {
        this.next = null;
        this.prev = null;
        this.value = value;
    }
}
class ChainedList {
    constructor(arrayOfDatas = null) {
        this.head = null;
        this.tail = null;
        this.length = 0;
        if (!arrayOfDatas || !arrayOfDatas.length)
            return;
        this.head = new ChainedListNode(arrayOfDatas[0]);
        let cursor = this.head;
        arrayOfDatas.forEach((data) => {
            const newNode = new ChainedListNode(data);
            newNode.prev = cursor;
            cursor.next = newNode;
            cursor = cursor.next;
        });
        this.tail = cursor;
    }
    insertFirst(data) {
        const newNode = new ChainedListNode(data);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.length += 1;
        return true;
    }
    insertLast(data) {
        const newNode = new ChainedListNode(data);
        if (!this.tail) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length += 1;
        return true;
    }
    insertAt(index, data) {
        // if trying to insert further than there is nodes, return false
        if (index > this.length)
            return false;
        // if trying to insert first, creates head & tail if there is none or insert it
        if (index === 0)
            return this.insertFirst(data);
        // if trying to insert it last, creates head & tail if there is none or insert it
        if (index === this.length)
            return this.insertLast(data);
        // if execution comes here, it means that the data is to be inserted somewhere between head and tail,
        // and as such head & tail both exists
        // it also means that head.next is defined all the way up to tail,
        // and tail.prev is defined all the way down to head
        // but we need to make some type checks to make typescript feel better
        if (!this.head || !this.head.next || !this.tail || !this.tail.prev)
            return false;
        const newNode = new ChainedListNode(data);
        let cursor;
        if (index <= this.length / 2) {
            cursor = this.head.next;
            for (let i = 1; i < index; i++) {
                // typescript type check security
                if (!cursor.next)
                    return false;
                cursor = cursor.next;
            }
        }
        else {
            cursor = this.tail;
            for (let i = this.length - 1; i > index; i--) {
                // typescript type check security
                if (!cursor.prev)
                    return false;
                cursor = cursor.prev;
            }
        }
        // typescript type check security
        if (!cursor.prev)
            return false;
        newNode.prev = cursor.prev;
        newNode.next = cursor;
        cursor.prev.next = newNode;
        this.length += 1;
        return true;
    }
    removeFirst() {
        if (!this.head)
            return true;
        this.head = this.head.next;
        if (this.head)
            this.head.prev = null;
        else
            this.tail = null;
        this.length -= 1;
        return true;
    }
    removeLast() {
        if (!this.tail)
            return true;
        this.tail = this.tail.prev;
        if (this.tail)
            this.tail.next = null;
        else
            this.head = null;
        this.length -= 1;
        return true;
    }
    removeAt(index) {
        // if trying to remove further than there is nodes, return false
        if (index >= this.length)
            return false;
        // if trying to remove first, delete head & tail if there was only 1 node left, or remove it
        if (index === 0)
            return this.removeFirst();
        // if trying to remove it last, delete head & tail if there was only 1 node left, or remove it
        if (index === this.length - 1)
            return this.removeLast();
        // if execution comes here, it means that the data is to be removed somewhere between head and tail,
        // and as such head & tail both exists
        // it also means that head.next is defined all the way up to tail,
        // and tail.prev is defined all the way down to head
        // but we need to make some type checks to make typescript feel better
        if (!this.head || !this.head.next || !this.tail || !this.tail.prev)
            return false;
        let cursor;
        if (index <= this.length / 2) {
            cursor = this.head.next;
            for (let i = 1; i < index; i++) {
                // typescript type check security
                if (!cursor.next)
                    return false;
                cursor = cursor.next;
            }
        }
        else {
            cursor = this.tail;
            for (let i = this.length - 1; i > index; i--) {
                // typescript type check security
                if (!cursor.prev)
                    return false;
                cursor = cursor.prev;
            }
        }
        if (!cursor.prev || !cursor.next)
            return false;
        cursor.prev.next = cursor.next;
        cursor.next.prev = cursor.prev;
        return true;
    }
}
exports.ChainedList = ChainedList;
