declare class ChainedListNode<T> {
    value: T;
    next: ChainedListNode<T> | null;
    prev: ChainedListNode<T> | null;
    constructor(value: T);
}
export declare class ChainedList<T> {
    head: ChainedListNode<T> | null;
    tail: ChainedListNode<T> | null;
    length: number;
    constructor(arrayOfDatas?: T[] | null);
    insertFirst(data: T): boolean;
    insertLast(data: T): boolean;
    insertAt(index: number, data: T): boolean;
    removeFirst(): boolean;
    removeLast(): boolean;
    removeAt(index: number): boolean;
}
export {};
