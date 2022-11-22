class ChainedListNode {
  constructor(value) {
    this.value = value
    this.next = null
    this.prev = null
  }
}

export default class ChainedList {
  constructor(arrayOfDatas = null) {
    this.head = null
    this.tail = null
    this.length = 0

    if (!arrayOfDatas || !arrayOfDatas.length) return

    this.head = new ChainedListNode(arrayOfDatas[0])
    let cursor = this.head

    for (this.length = 1; this.length < arrayOfDatas.length; this.length++) {
      const newNode = new ChainedListNode(arrayOfDatas[this.length])
      newNode.prev = cursor
      cursor.next = newNode

      cursor = cursor.next
    }

    this.tail = cursor
  }

  /**
   * Reverse the list.
   */
  reverse() {
    this.head = this.#__private__reverse(this.head)
  }

  /**
   * Inserts a new node at the first position.
   * 
   * @param {any} data The data to insert  
   */
  insertFirst(data) {
    const newNode = new ChainedListNode(data)

    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    } else {
      newNode.next = this.head
      this.head.prev = newNode
      this.head = newNode
    }

    this.length += 1

    return true
  }

  /**
   * Inserts a new node at the last position.
   * 
   * @param {any} data The data to insert  
   */
  insertLast(data) {
    const newNode = new ChainedListNode(data)

    if (!this.tail) {
      this.head = newNode
      this.tail = newNode
    } else {
      newNode.prev = this.tail
      this.tail.next = newNode
      this.tail = newNode
    }

    this.length += 1

    return true
  }

  /**
   * Inserts a new node at the given index.
   * 
   * @param {Number}  index The index at which insert the new node   
   * @param {any}     data  The data to insert  
   */
  insertAt(index, data) {
    if (index > this.length) return false

    if (index === 0) return this.insertFirst(data)
    if (index === this.length) return this.insertLast(data)

    const newNode = new ChainedListNode(data)

    let cursor = null

    if (index <= this.length / 2) {
      cursor = this.head.next
      for (let i = 1; i < index; i++) cursor = cursor.next
    } else {
      cursor = this.tail
      for (let i = this.length - 1; i > index; i--) cursor = cursor.prev
    }

    newNode.prev = cursor.prev
    newNode.next = cursor
    cursor.prev.next = newNode

    this.length += 1

    return true
  }

  /**
   * Removes the first node.
   */
  removeFirst() {
    if (!this.head) return true

    this.head = this.head.next

    if (this.head) this.head.prev = null
    else this.tail = null

    this.length -= 1

    return true
  }

  /**
   * Removes the last node.
   */
  removeLast() {
    if (!this.tail) return true

    this.tail = this.tail.prev

    if (this.tail) this.tail.next = null
    else this.head = null

    this.length -= 1

    return true
  }

  /**
   * Removes node at the given index.
   * 
   * @param {Number}  index The index of the node to remove
   */
  removeAt(index) {
    if (index >= this.length) return false

    if (index === 0) return this.removeFirst()
    if (index === this.length - 1) return this.removeLast()

    let cursor = null

    if (index <= this.length / 2) {
      cursor = this.head.next
      for (let i = 1; i < index; i++) cursor = cursor.next
    } else {
      cursor = this.tail
      for (let i = this.length - 1; i > index; i--) cursor = cursor.prev
    }

    cursor.prev.next = cursor.next
    cursor.next.prev = cursor.prev
  }

  /* PRIVATE METHODS */

  #__private__reverse(node) {
    if (!node.next) return node
  
    const newHead = this.#__private__reverse(node.next)
    node.next.next = node
    node.next = null

    return newHead
  }
}
