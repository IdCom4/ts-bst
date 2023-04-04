declare class BSTNode<T> {
    datas: T[];
    nodeValueToString: (data: T) => string;
    left: BSTNode<T> | null;
    right: BSTNode<T> | null;
    leftHeight: number;
    rightHeight: number;
    constructor(datas: T[], nodeValueToString: (data: T) => string | null);
    /**
     * Add data to the already existing datas of this nodes.
     *
     * @param {T} newData The data equal to this node's
     */
    addDataDuplicate(newData: T): void;
    /**
     * @returns {string} The string representation of the node's data
     */
    toString(): string;
    /**
     * @returns {number} The greatest height of the node
     */
    getMaxHeight(): number;
    /**
     * @returns {number} The relative balance of the node
     */
    getBalance(): number;
    /**
     * @returns {number} The absolute balance of the node
     */
    getAbsBalance(): number;
    /**
     * @returns {boolean} True if the tree that has this node as root is balanced, false otherwise
     */
    isBalanced(): boolean;
    /**
     * @returns {boolean} True if the tree that has this node as root is too heavy on his left branch, false otherwise
     */
    isLeftHeavy(): boolean;
    /**
     * @returns {boolean} True if the tree that has this node as root is too heavy on his right branch, false otherwise
     */
    isRightHeavy(): boolean;
}
export declare class BinarySearchTree<T> {
    private root;
    private nodeValueToString;
    private compareNodesValue;
    /**
     * @param {Array<T>}    arrayOfData           An array containing all the data to convert to tree
     * @param {boolean}     preserveInitialArray  A boolean that controls whether the initial array of data should be preserved, which is less optimized but also less intrusive. [if preserved, data stored in the tree becomes POJOs ] (default: false)
     * @param {Function}    compareNodesValue     A optional function that must take the data of 2 nodes as parameter and compare them as see fit. Must return < 0 if first is lesser, > 0 if greater, 0 if equal
     * @param {Function}    nodeValueToString     A optional function that must take the data of a node as parameter and  returns it string representation
    */
    constructor(arrayOfData: T[] | null, preserveInitialArray?: boolean, compareNodesValue?: (data1: T, data2: T) => number | null, nodeValueToString?: (data: T) => string | null);
    getRoot(): BSTNode<T> | null;
    /**
     * Inserts the given data at the right place in the tree. The tree is balanced if needed.
     *
     * @param {T} data The data to store in the tree
     */
    insert(data: T): void;
    /**
     * Inserts the given datas at the right place in the tree. The tree is balanced if needed.
     *
     * @param {Array<T>}  arrayOfData                  The data to store in the tree
     * @param {boolean}   preserveInitialArray  A boolean that controls whether the initial array of data should be preserved, which is less optimized but also less intrusive. [if preserved, data stored in the tree becomes POJOs ] (default: false)
     */
    insertMany(arrayOfData: T[], preserveInitialArray?: boolean): void;
    /**
     * Finds and remove the given data from the tree, if it exists. The tree is balanced if needed.
     * @param {T} dataToRemove The data to find and remove from the tree
     */
    remove(dataToRemove: T): void;
    /**
     * Inverts the tree.
     */
    invert(): void;
    /**
     * Balances the tree to keep it optimized.
     */
    balance(): void;
    /**
     * Finds and return the given data from the tree, if it exists.
     *
     * @param {T} dataToFind The data to find in the tree
     *
     * @returns The data if it exists, null otherwise
     */
    find(dataToFind: T): T | null;
    /**
     * Finds and return the all the copies of the given data from the tree, if it exists.
     *
     * @param {T} dataToFind The data to find in the tree
     *
     * @returns The datas if it exists, null otherwise
     */
    findAll(dataToFind: T): T[] | null;
    /**
     * Finds and return the closest match of the given data from the tree, if it exists.
     *
     * @param {T} dataToFind The data to find in the tree
     *
     * @returns The closest data if it exists, null otherwise
     */
    findClosest(dataToFind: T): T | null;
    /**
     * Finds and return all the copies of the closest match of the given data from the tree, if it exists.
     *
     * @param {T} dataToFind The data to find in the tree
     *
     * @returns The closest datas if it exists, null otherwise
     */
    findClosests(dataToFind: T): T[] | null;
    /**
     * Iterates through the entire tree and run the given function on all nodes.
     *
     * @param {Function} callback The function to run on all nodes
     */
    forEach(callback: (datas: T | T[]) => void): void;
    /**
     * Print the content & arrangement of given tree with all its meta data in a concise way.
     *
     * @param {number}   depth The limit depth of the tree to print. If not specified, root's max depth is used
     * @param {BSTNode<T> | null}  root  The root of the tree we want to print. If not specified, this BST's top root is used
     */
    printConcise(depth?: number, root?: BSTNode<T> | null): void;
    /**
     * Print the content & arrangement of given tree as a graph.
     *
     * @param {number}           depth The limit depth of the tree to print. If not specified, root's max depth is used
     * @param {BSTNode<T> | null} root  The root of the tree we want to print. If not specified, this BST's top root is used
     */
    print(depth?: number, root?: BSTNode<T>): void;
    /**
     * Takes an array of data & converts it to a tree.
     *
     * @param {Array<T>} arrayOfData The array of data
     *
     * @returns {BSTNode<T>} The new root of the tree
     */
    private _buildTree;
    /**
     * Set every node's heigth accordingly to their current arrangement.
     *
     * @param {BSTNode<T> | null} root The root of the tree whose node's height we want to set
     *
     * @returns The maximum height of the tree
     */
    private _updateHeights;
    /**
     * Insert a new node inside a tree.
     *
     * @param {BSTNode<T> | null} root    The root of the tree to which we try to append the new node
     * @param {T}                 newData The data to append to the tree
     *
     * @returns The new max height of root
     */
    private _insertNode;
    /**
     * Removes a node from the tree.
     *
     * @param {BSTNode<T> | null} root          The root of the tree to which we try to append the new node
     * @param {T}                 dataToRemove  The data to remove of the tree
     *
     * @returns The new root of the tree
     */
    private _removeNode;
    /**
     * Balance a tree.
     *
     * @param {BSTNode<T> | null} root The root of the tree to balance
     * @returns The new root of the balanced tree
     */
    private _balance;
    /**
     * Performs a left rotation of the tree.
     *
     * @param {BSTNode<T> | null} root The root of the tree to rotate
     *
     * @returns The new root after rotation
     */
    private _rotateLeft;
    /**
     * Performs a right rotation of the tree.
     *
     * @param {BSTNode<T> | null} root The root of the tree to rotate
     *
     * @returns The new root after rotation
     */
    private _rotateRight;
    private _invert;
    /**
     * Finds and returns the first node's data or array of data that matches the one provided
     *
     * @param {BSTNode<T> | null} root        The root of the tree
     * @param {T}                 dataToFind  The data to find
     * @param {boolean}           getAllDataCopies A Boolean to control whether you want a single data or all its duplicates
     *
     * @returns The data or array of data if found, null otherwise
     */
    private _find;
    /**
     * Finds and returns the first node's data or array of data that matches the best the one provided
     *
     * @param {BSTNode<T> | null}   root                The root of the tree
     * @param {T}     dataToFind          The data to find
     * @param {IBestMatch}  currentClosestMatch An object with 2 properties (node && absComparisonScore) holding the current best match
     *
     * @returns {any} The data or array of data if found, null otherwise
     */
    private _findClosest;
    /**
     * Iterates through a tree and run the callback function on each node.
     *
     * @param {Function}              callback  The function to run on nodes
     * @param {BSTNode<T> | null}     root      The root of the tree
     */
    private _forEach;
    /**
     * Find the maximum string length a node value of the tree can be.
     *
     * @param {BSTNode<T> | null} root The root of the tree whose max value length we want.
     *
     * @returns  The maximum length found
     */
    private _getMaxValueLength;
    /**
     * Create a String that will represent an entire row of the tree
     *
     * @param {Array<BSTNode<T>>} rowNodes        An array containing all the nodes that are at the same depth
     * @param {number}      currentDepth    The current depth of the row we want to print
     * @param {number}      maxDepth        The maximum depth of the tree
     * @param {number}      maxValueLength  The maximum string length a value can be in the tree
     * @param {number}      linesLength     The length that a line must be to welcome the largest row
     *
     * @returns The String that contains the representation of the requested row
     */
    private _createRowPrint;
    /**
     * Create a String that will represent all the links between a row and the next
     *
     * @param {Array<BSTNode<T>>} rowNodes        An array containing all the nodes that are at the same depth
     * @param {number}            currentDepth    The current depth of the row we want to print
     * @param {number}            maxDepth        The maximum depth of the tree
     * @param {number}            linesLength     The length that a line must be to welcome the largest row
     *
     * @returns The String that contains the inter-row links for the requested row
     */
    private _createInterRowPrint;
}
export {};
