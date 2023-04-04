
class ChainedListNode<T> {
  value: T
  next: ChainedListNode<T> | null = null
  prev: ChainedListNode<T> | null = null

  constructor(value: T) {
    this.value = value
  }
}

export class ChainedList<T> {
  head: ChainedListNode<T> | null = null
  tail: ChainedListNode<T> | null = null
  length = 0

  constructor(arrayOfDatas: T[] | null = null) {
    if (!arrayOfDatas || !arrayOfDatas.length) return

    this.head = new ChainedListNode<T>(arrayOfDatas[0])
    let cursor = this.head

    arrayOfDatas.forEach((data: T) => {
      const newNode = new ChainedListNode<T>(data)

      newNode.prev = cursor
      cursor.next = newNode

      cursor = cursor.next
    })

    this.tail = cursor
  }

  insertFirst(data: T): boolean {
    const newNode = new ChainedListNode<T>(data)

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

  insertLast(data: T): boolean {
    const newNode = new ChainedListNode<T>(data)

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

  insertAt(index: number, data: T): boolean {
    // if trying to insert further than there is nodes, return false
    if (index > this.length) return false

    // if trying to insert first, creates head & tail if there is none or insert it
    if (index === 0) return this.insertFirst(data)
    // if trying to insert it last, creates head & tail if there is none or insert it
    if (index === this.length) return this.insertLast(data)

    // if execution comes here, it means that the data is to be inserted somewhere between head and tail,
    // and as such head & tail both exists
    // it also means that head.next is defined all the way up to tail,
    // and tail.prev is defined all the way down to head

    // but we need to make some type checks to make typescript feel better
    if (!this.head || !this.head.next || !this.tail || !this.tail.prev) return false

    const newNode = new ChainedListNode<T>(data)

    let cursor: ChainedListNode<T>

    if (index <= this.length / 2) {
      cursor = this.head.next
      for (let i = 1; i < index; i++) {
        // typescript type check security
        if (!cursor.next) return false
        cursor = cursor.next
      }
    } else {
      cursor = this.tail
      for (let i = this.length - 1; i > index; i--) {
        // typescript type check security
        if (!cursor.prev) return false
        cursor = cursor.prev
      }
    }

    // typescript type check security
    if (!cursor.prev) return false

    newNode.prev = cursor.prev
    newNode.next = cursor
    cursor.prev.next = newNode

    this.length += 1

    return true
  }

  removeFirst(): boolean {
    if (!this.head) return true

    this.head = this.head.next

    if (this.head) this.head.prev = null
    else this.tail = null

    this.length -= 1

    return true
  }

  removeLast(): boolean {
    if (!this.tail) return true

    this.tail = this.tail.prev

    if (this.tail) this.tail.next = null
    else this.head = null

    this.length -= 1

    return true
  }

  removeAt(index: number): boolean {
    // if trying to remove further than there is nodes, return false
    if (index >= this.length) return false

    // if trying to remove first, delete head & tail if there was only 1 node left, or remove it
    if (index === 0) return this.removeFirst()
    // if trying to remove it last, delete head & tail if there was only 1 node left, or remove it
    if (index === this.length - 1) return this.removeLast()

    // if execution comes here, it means that the data is to be removed somewhere between head and tail,
    // and as such head & tail both exists
    // it also means that head.next is defined all the way up to tail,
    // and tail.prev is defined all the way down to head

    // but we need to make some type checks to make typescript feel better
    if (!this.head || !this.head.next || !this.tail || !this.tail.prev) return false

    let cursor: ChainedListNode<T>

    if (index <= this.length / 2) {
      cursor = this.head.next
      for (let i = 1; i < index; i++) {
        // typescript type check security
        if (!cursor.next) return false
        cursor = cursor.next
      }
    } else {
      cursor = this.tail
      for (let i = this.length - 1; i > index; i--) {
        // typescript type check security
        if (!cursor.prev) return false
        cursor = cursor.prev
      }
    }

    if (!cursor.prev || !cursor.next) return false

    cursor.prev.next = cursor.next
    cursor.next.prev = cursor.prev

    return true
  }
}
