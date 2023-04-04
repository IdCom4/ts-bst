"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinarySearchTree = void 0;
class BSTNode {
    constructor(datas, nodeValueToString) {
        this.datas = datas;
        this.left = null;
        this.leftHeight = 0;
        this.right = null;
        this.rightHeight = 0;
        this.nodeValueToString = (nodeValueToString || ((data) => `${data}`));
    }
    /**
     * Add data to the already existing datas of this nodes.
     *
     * @param {T} newData The data equal to this node's
     */
    addDataDuplicate(newData) {
        this.datas.push(newData);
    }
    /**
     * @returns {string} The string representation of the node's data
     */
    toString() {
        return this.nodeValueToString(this.datas[0]);
    }
    /**
     * @returns {number} The greatest height of the node
     */
    getMaxHeight() {
        return Math.max(this.leftHeight, this.rightHeight);
    }
    /**
     * @returns {number} The relative balance of the node
     */
    getBalance() {
        return this.leftHeight - this.rightHeight;
    }
    /**
     * @returns {number} The absolute balance of the node
     */
    getAbsBalance() {
        return Math.abs(this.getBalance());
    }
    /**
     * @returns {boolean} True if the tree that has this node as root is balanced, false otherwise
     */
    isBalanced() {
        return this.getAbsBalance() <= 1;
    }
    /**
     * @returns {boolean} True if the tree that has this node as root is too heavy on his left branch, false otherwise
     */
    isLeftHeavy() {
        return this.getBalance() > 1;
    }
    /**
     * @returns {boolean} True if the tree that has this node as root is too heavy on his right branch, false otherwise
     */
    isRightHeavy() {
        return this.getBalance() < -1;
    }
}
class BinarySearchTree {
    /**
     * @param {Array<T>}    arrayOfData           An array containing all the data to convert to tree
     * @param {boolean}     preserveInitialArray  A boolean that controls whether the initial array of data should be preserved, which is less optimized but also less intrusive. [if preserved, data stored in the tree becomes POJOs ] (default: false)
     * @param {Function}    compareNodesValue     A optional function that must take the data of 2 nodes as parameter and compare them as see fit. Must return < 0 if first is lesser, > 0 if greater, 0 if equal
     * @param {Function}    nodeValueToString     A optional function that must take the data of a node as parameter and  returns it string representation
    */
    constructor(arrayOfData, preserveInitialArray = false, compareNodesValue, nodeValueToString) {
        this.root = null;
        // setup node functions
        // eslint-disable-next-line prettier/prettier
        this.compareNodesValue = (compareNodesValue || ((data1, data2) => data1 - data2));
        this.nodeValueToString = (nodeValueToString || ((data) => `${data}`));
        // security check
        if (!arrayOfData || !arrayOfData.length)
            return;
        // sort once the array to increase tree build efficiency
        // js sort implementation depends of the interpretor, but is efficient in general
        arrayOfData.sort(this.compareNodesValue);
        // we know that there is data, and therefore that there will be a node
        this.root = this._buildTree(preserveInitialArray ? JSON.parse(JSON.stringify(arrayOfData)) : arrayOfData);
        if (!this.root.isBalanced())
            this.balance();
    }
    getRoot() {
        return this.root;
    }
    /**
     * Inserts the given data at the right place in the tree. The tree is balanced if needed.
     *
     * @param {T} data The data to store in the tree
     */
    insert(data) {
        if (!this.root)
            this.root = this._buildTree([data]);
        else {
            this._insertNode(this.root, data);
            if (!this.root.isBalanced())
                this.balance();
        }
    }
    /**
     * Inserts the given datas at the right place in the tree. The tree is balanced if needed.
     *
     * @param {Array<T>}  arrayOfData                  The data to store in the tree
     * @param {boolean}   preserveInitialArray  A boolean that controls whether the initial array of data should be preserved, which is less optimized but also less intrusive. [if preserved, data stored in the tree becomes POJOs ] (default: false)
     */
    insertMany(arrayOfData, preserveInitialArray = false) {
        if (!this.root)
            this.root = this._buildTree(preserveInitialArray ? JSON.parse(JSON.stringify(arrayOfData)) : arrayOfData);
        else {
            arrayOfData.forEach(data => this._insertNode(this.root, data));
            if (!this.root.isBalanced())
                this.balance();
        }
    }
    /**
     * Finds and remove the given data from the tree, if it exists. The tree is balanced if needed.
     * @param {T} dataToRemove The data to find and remove from the tree
     */
    remove(dataToRemove) {
        if (!this.root)
            return;
        this.root = this._removeNode(this.root, dataToRemove);
        if (this.root && !this.root.isBalanced())
            this.root = this._balance(this.root);
    }
    // last common ancestor
    /**
     * Inverts the tree.
     */
    invert() {
        this._invert(this.root);
    }
    /**
     * Balances the tree to keep it optimized.
     */
    balance() {
        this.root = this._balance(this.root);
    }
    /**
     * Finds and return the given data from the tree, if it exists.
     *
     * @param {T} dataToFind The data to find in the tree
     *
     * @returns The data if it exists, null otherwise
     */
    find(dataToFind) {
        const foundDatas = this._find(this.root, dataToFind, false);
        return foundDatas ? foundDatas[0] : null;
    }
    /**
     * Finds and return the all the copies of the given data from the tree, if it exists.
     *
     * @param {T} dataToFind The data to find in the tree
     *
     * @returns The datas if it exists, null otherwise
     */
    findAll(dataToFind) {
        return this._find(this.root, dataToFind, true);
    }
    /**
     * Finds and return the closest match of the given data from the tree, if it exists.
     *
     * @param {T} dataToFind The data to find in the tree
     *
     * @returns The closest data if it exists, null otherwise
     */
    findClosest(dataToFind) {
        if (!this.root)
            return null;
        const currentBestMatch = { node: this.root, absComparisonScore: Infinity };
        const bestMatch = this._findClosest(this.root, dataToFind, currentBestMatch);
        return bestMatch.node && bestMatch.node.datas[0];
    }
    /**
     * Finds and return all the copies of the closest match of the given data from the tree, if it exists.
     *
     * @param {T} dataToFind The data to find in the tree
     *
     * @returns The closest datas if it exists, null otherwise
     */
    findClosests(dataToFind) {
        if (!this.root)
            return null;
        const currentBestMatch = { node: this.root, absComparisonScore: Infinity };
        const bestMatch = this._findClosest(this.root, dataToFind, currentBestMatch);
        return bestMatch.node && bestMatch.node.datas;
    }
    /**
     * Iterates through the entire tree and run the given function on all nodes.
     *
     * @param {Function} callback The function to run on all nodes
     */
    forEach(callback) {
        this._forEach(callback, this.root);
    }
    /**
     * Print the content & arrangement of given tree with all its meta data in a concise way.
     *
     * @param {number}   depth The limit depth of the tree to print. If not specified, root's max depth is used
     * @param {BSTNode<T> | null}  root  The root of the tree we want to print. If not specified, this BST's top root is used
     */
    printConcise(depth = 0, root = null) {
        const rootToPrint = root || this.root;
        // eslint-disable-next-line no-console
        if (!rootToPrint)
            return console.log('null');
        const treeMaxDepth = rootToPrint.getMaxHeight();
        const maxDepth = depth && depth <= treeMaxDepth ? depth : treeMaxDepth;
        // setup queue
        const queue = [rootToPrint];
        // setup row monitoring data
        let row = [];
        let rowIndex = 0;
        let remainingNodesOfRow = 1;
        let nextRowNodes = 0;
        while (queue.length) {
            // there is always a node to take here
            // since we only take if there is something in the queue and never push a null value in it
            const current = queue.shift();
            remainingNodesOfRow--;
            row.push(current);
            if (current.left) {
                queue.push(current.left);
                nextRowNodes++;
            }
            if (current.right) {
                queue.push(current.right);
                nextRowNodes++;
            }
            if (!remainingNodesOfRow) {
                // print row's data
                // eslint-disable-next-line no-console
                console.log(row
                    .map((node) => `[n(${node.getMaxHeight()}): ${node.toString()} <l(${node.leftHeight}): ${node.left ? node.left.toString() : '-'} | r(${node.rightHeight}): ${node.right ? node.right.toString() : '-'} >]`)
                    .join(' '));
                if (rowIndex === maxDepth)
                    break;
                // setup variables for next row
                row = [];
                rowIndex++;
                remainingNodesOfRow = nextRowNodes;
                nextRowNodes = 0;
            }
        }
    }
    /**
     * Print the content & arrangement of given tree as a graph.
     *
     * @param {number}           depth The limit depth of the tree to print. If not specified, root's max depth is used
     * @param {BSTNode<T> | null} root  The root of the tree we want to print. If not specified, this BST's top root is used
     */
    print(depth = 0, root) {
        const rootToPrint = root || this.root;
        // eslint-disable-next-line no-console
        if (!rootToPrint)
            return console.log('null');
        const treeMaxDepth = rootToPrint.getMaxHeight();
        const maxDepth = depth && depth <= treeMaxDepth ? depth : treeMaxDepth;
        let maxValueLength = this._getMaxValueLength(rootToPrint);
        if (maxValueLength % 2 === 0)
            maxValueLength += 1;
        const lastRowNodesAmount = Math.pow(2, maxDepth);
        const linesLength = (maxValueLength + 2) * lastRowNodesAmount + 1 * (lastRowNodesAmount / 2) + 3 * (lastRowNodesAmount / 2 - 1) + 2;
        const queue = [rootToPrint];
        let rowNodes = [];
        let currentRowIndex = 0;
        let remainingNodesOfRow = 1;
        while (queue.length) {
            const current = queue.shift();
            remainingNodesOfRow--;
            rowNodes.push(current);
            if (current) {
                queue.push(current.left);
                queue.push(current.right);
            }
            else
                queue.push(null, null);
            if (!remainingNodesOfRow) {
                // create & print line
                // eslint-disable-next-line no-console
                console.log(this._createRowPrint(rowNodes, currentRowIndex, maxDepth, maxValueLength, linesLength));
                if (currentRowIndex < maxDepth) {
                    // eslint-disable-next-line no-console
                    console.log(this._createInterRowPrint(rowNodes, currentRowIndex, maxDepth, linesLength));
                }
                // reset data
                if (currentRowIndex === maxDepth)
                    break;
                rowNodes = [];
                currentRowIndex++;
                remainingNodesOfRow = Math.pow(2, currentRowIndex);
            }
        }
    }
    /* PRIVATE METHODS */
    /* ALGO METHODS */
    /**
     * Takes an array of data & converts it to a tree.
     *
     * @param {Array<T>} arrayOfData The array of data
     *
     * @returns {BSTNode<T>} The new root of the tree
     */
    _buildTree(arrayOfData) {
        if (!arrayOfData || !arrayOfData.length)
            return null;
        if (arrayOfData.length === 1)
            return new BSTNode(arrayOfData, this.nodeValueToString);
        // find all occurrences of the chosen pivot
        const middleIndex = Math.floor(arrayOfData.length / 2);
        let firstDataOccurrenceIndex = middleIndex;
        let lastDataOccurrenceIndex = middleIndex;
        while (firstDataOccurrenceIndex > 0 && this.compareNodesValue(arrayOfData[firstDataOccurrenceIndex - 1], arrayOfData[middleIndex]) === 0)
            firstDataOccurrenceIndex--;
        while (lastDataOccurrenceIndex < arrayOfData.length - 1 &&
            this.compareNodesValue(arrayOfData[lastDataOccurrenceIndex + 1], arrayOfData[middleIndex]) === 0)
            lastDataOccurrenceIndex++;
        const lesserDatas = arrayOfData.splice(0, firstDataOccurrenceIndex);
        const greaterDatas = arrayOfData.splice(lastDataOccurrenceIndex - firstDataOccurrenceIndex + 1, arrayOfData.length);
        // create root with pivot values
        const root = new BSTNode(arrayOfData, this.nodeValueToString);
        // create left tree with lesser values
        root.left = this._buildTree(lesserDatas);
        if (root.left && !root.left.isBalanced())
            root.left = this._balance(root.left);
        root.leftHeight = root.left ? root.left.getMaxHeight() + 1 : 0;
        // create right tree with greater values
        root.right = this._buildTree(greaterDatas);
        if (root.right && !root.right.isBalanced())
            root.right = this._balance(root.right);
        root.rightHeight = root.right ? root.right.getMaxHeight() + 1 : 0;
        return root;
    }
    /**
     * Set every node's heigth accordingly to their current arrangement.
     *
     * @param {BSTNode<T> | null} root The root of the tree whose node's height we want to set
     *
     * @returns The maximum height of the tree
     */
    _updateHeights(root) {
        if (!root)
            return -1;
        root.leftHeight = this._updateHeights(root.left) + 1;
        root.rightHeight = this._updateHeights(root.right) + 1;
        return root.getMaxHeight();
    }
    /**
     * Insert a new node inside a tree.
     *
     * @param {BSTNode<T> | null} root    The root of the tree to which we try to append the new node
     * @param {T}                 newData The data to append to the tree
     *
     * @returns The new max height of root
     */
    _insertNode(root, newData) {
        if (!root)
            return -1;
        const nodesComparison = this.compareNodesValue(newData, root.datas[0]);
        // check if nodes are equal
        if (nodesComparison === 0)
            root.addDataDuplicate(newData);
        // if value is less
        else if (nodesComparison < 0) {
            // if there is a left branch, insert deeper
            if (root.left) {
                root.leftHeight = this._insertNode(root.left, newData) + 1;
                if (!root.left.isBalanced()) {
                    root.left = this._balance(root.left);
                    root.leftHeight = root.left.getMaxHeight() + 1;
                }
            }
            // else set it as the new branch
            else {
                root.left = new BSTNode([newData], this.nodeValueToString);
                root.leftHeight = 1;
            }
        }
        // if value is greater
        // if there is a right branch, insert deeper
        else if (root.right) {
            root.rightHeight = this._insertNode(root.right, newData) + 1;
            // check if instertion unbalanced the subtree, and if so balance it
            if (!root.right.isBalanced()) {
                root.right = this._balance(root.right);
                root.rightHeight = root.right.getMaxHeight() + 1;
            }
        }
        // else set it as the new branch
        else {
            root.right = new BSTNode([newData], this.nodeValueToString);
            root.rightHeight = 1;
        }
        return root.getMaxHeight();
    }
    /**
     * Removes a node from the tree.
     *
     * @param {BSTNode<T> | null} root          The root of the tree to which we try to append the new node
     * @param {T}                 dataToRemove  The data to remove of the tree
     *
     * @returns The new root of the tree
     */
    _removeNode(root, dataToRemove) {
        if (!root)
            return null;
        const nodesComparison = this.compareNodesValue(dataToRemove, root.datas[0]);
        // check if nodes are equal
        if (nodesComparison === 0) {
            // case 1: 0 children
            if (!root.left && !root.right)
                return null;
            // case 2: only 1 child
            else if (!root.left)
                return root.right;
            else if (!root.right)
                return root.left;
            // case 3: 2 children
            else if (root.leftHeight > root.rightHeight) {
                // find the largest value of the left tree
                let parent = root;
                let leftLargestNode = root.left;
                let depth = 0;
                while (leftLargestNode.right) {
                    parent = leftLargestNode;
                    leftLargestNode = leftLargestNode.right;
                    depth += 1;
                }
                // swap places with the current root
                const datasTmp = root.datas;
                root.datas = leftLargestNode.datas;
                leftLargestNode.datas = datasTmp;
                // and then delete the node that was swaped
                // if depth is still 0, it mean that the left largest value was the direct root's left child
                // and so it's the parent's left that must be updated
                if (!depth) {
                    parent.left = this._removeNode(parent.left, dataToRemove);
                    parent.leftHeight = parent.left ? parent.left.getMaxHeight() + 1 : 0;
                }
                // else it means it found a largest value at the right of some node
                // so update the right child
                else {
                    parent.right = this._removeNode(leftLargestNode, dataToRemove);
                    parent.rightHeight = parent.right ? parent.right.getMaxHeight() + 1 : 0;
                }
            }
            else {
                // find the largest value of the left tree
                let parent = root;
                let rightLargestNode = root.right;
                let depth = 0;
                while (rightLargestNode.left) {
                    parent = rightLargestNode;
                    rightLargestNode = rightLargestNode.left;
                    depth += 1;
                }
                // swap places with the current root
                const datasTmp = root.datas;
                root.datas = rightLargestNode.datas;
                rightLargestNode.datas = datasTmp;
                // and then delete the node that was swaped
                // if depth is still 0, it mean that the right smallest value was the direct root's right child
                // and so it's the parent's right that must be updated
                if (!depth) {
                    parent.right = this._removeNode(parent.right, dataToRemove);
                    parent.rightHeight = parent.right ? parent.right.getMaxHeight() + 1 : 0;
                }
                // else it means it found a smallest value at the left of some node
                // so update the left child
                else {
                    parent.left = this._removeNode(rightLargestNode, dataToRemove);
                    parent.leftHeight = parent.left ? parent.left.getMaxHeight() + 1 : 0;
                }
            }
        }
        // if value is less
        else if (nodesComparison < 0) {
            root.left = this._removeNode(root.left, dataToRemove);
            root.leftHeight = root.left ? root.left.getMaxHeight() + 1 : 0;
            if (!root.isBalanced())
                return this._balance(root);
        }
        // if value is greater
        // if there is a right branch, search deeper
        else {
            root.right = this._removeNode(root.right, dataToRemove);
            root.rightHeight = root.right ? root.right.getMaxHeight() + 1 : 0;
            if (!root.isBalanced())
                return this._balance(root);
        }
        return root;
    }
    /**
     * Balance a tree.
     *
     * @param {BSTNode<T> | null} root The root of the tree to balance
     * @returns The new root of the balanced tree
     */
    _balance(root) {
        // base case
        if (!root || (!root.left && !root.right))
            return root;
        // balance subtrees
        if (root.left) {
            root.left = this._balance(root.left);
            root.leftHeight = root.left.getMaxHeight() + 1;
        }
        if (root.right) {
            root.right = this._balance(root.right);
            root.rightHeight = root.right.getMaxHeight() + 1;
        }
        if (!root.isBalanced()) {
            if (root.isRightHeavy())
                return this._rotateLeft(root);
            else
                return this._rotateRight(root);
        }
        return root;
    }
    /**
     * Performs a left rotation of the tree.
     *
     * @param {BSTNode<T> | null} root The root of the tree to rotate
     *
     * @returns The new root after rotation
     */
    _rotateLeft(root) {
        if (!root || !root.right)
            return root;
        // perform a sub-right rotation if needed
        //  1         1
        //   \         \
        //    3   =>    2
        //   /           \
        //  2             3
        if (!root.right.right && root.right.left) {
            // rotate
            root.right.left.right = root.right;
            root.right = root.right.left;
            // at this ligne, root.right.right is equal to the original root.right
            // wich we know is not null from the condition
            /* eslint-disable @typescript-eslint/no-non-null-assertion */
            root.right.right.left = null;
            // update heights
            root.right.right.leftHeight = 0;
            root.right.right.rightHeight = 0;
            /* eslint-enable @typescript-eslint/no-non-null-assertion */
            root.right.leftHeight = 0;
            root.right.rightHeight = 1;
        }
        // rotate
        const oldRoot = root;
        // we know from the previous conditions & checks that root.right is not null here
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const newRoot = oldRoot.right;
        oldRoot.right = newRoot.left;
        newRoot.left = oldRoot;
        // update height
        oldRoot.leftHeight = oldRoot.left ? oldRoot.left.getMaxHeight() + 1 : 0;
        oldRoot.rightHeight = oldRoot.right ? oldRoot.right.getMaxHeight() + 1 : 0;
        newRoot.leftHeight = newRoot.left ? newRoot.left.getMaxHeight() + 1 : 0;
        newRoot.rightHeight = newRoot.right ? newRoot.right.getMaxHeight() + 1 : 0;
        return newRoot;
    }
    /**
     * Performs a right rotation of the tree.
     *
     * @param {BSTNode<T> | null} root The root of the tree to rotate
     *
     * @returns The new root after rotation
     */
    _rotateRight(root) {
        if (!root || !root.left)
            return root;
        // perform a sub-left rotation if needed
        //   3           3
        //  /           /
        // 1     =>    2
        //  \         /
        //   2       1
        if (!root.left.left && root.left.right) {
            // rotate
            root.left.right.left = root.left;
            root.left = root.left.right;
            // at this ligne, root.left.left is now equal to the original root.left
            // wich we know is not null from the condition
            /* eslint-disable @typescript-eslint/no-non-null-assertion */
            root.left.left.right = null;
            // update heights
            root.left.left.leftHeight = 0;
            root.left.left.rightHeight = 0;
            /* eslint-enable @typescript-eslint/no-non-null-assertion */
            root.left.leftHeight = 0;
            root.left.rightHeight = 1;
        }
        // rotate right
        const oldRoot = root;
        // we know from the previous conditions & checks that root.right is not null here
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const newRoot = oldRoot.left;
        oldRoot.left = newRoot.right;
        newRoot.right = oldRoot;
        // update height
        oldRoot.leftHeight = oldRoot.left ? oldRoot.left.getMaxHeight() + 1 : 0;
        oldRoot.rightHeight = oldRoot.right ? oldRoot.right.getMaxHeight() + 1 : 0;
        newRoot.leftHeight = newRoot.left ? newRoot.left.getMaxHeight() + 1 : 0;
        newRoot.rightHeight = newRoot.right ? newRoot.right.getMaxHeight() + 1 : 0;
        return newRoot;
    }
    _invert(root) {
        if (!root || (!root.left && !root.right))
            return;
        const tmp = root.left;
        root.left = root.right;
        root.right = tmp;
        this._invert(root.left);
        this._invert(root.right);
    }
    /**
     * Finds and returns the first node's data or array of data that matches the one provided
     *
     * @param {BSTNode<T> | null} root        The root of the tree
     * @param {T}                 dataToFind  The data to find
     * @param {boolean}           getAllDataCopies A Boolean to control whether you want a single data or all its duplicates
     *
     * @returns The data or array of data if found, null otherwise
     */
    _find(root, dataToFind, getAllDataCopies = false) {
        if (!root)
            return null;
        const valueComparison = this.compareNodesValue(dataToFind, root.datas[0]);
        // if equal
        if (valueComparison === 0)
            return getAllDataCopies ? root.datas : [root.datas[0]];
        // if less
        else if (valueComparison < 0)
            return this._find(root.left, dataToFind, getAllDataCopies);
        // if greater
        else
            return this._find(root.right, dataToFind, getAllDataCopies);
    }
    /**
     * Finds and returns the first node's data or array of data that matches the best the one provided
     *
     * @param {BSTNode<T> | null}   root                The root of the tree
     * @param {T}     dataToFind          The data to find
     * @param {IBestMatch}  currentClosestMatch An object with 2 properties (node && absComparisonScore) holding the current best match
     *
     * @returns {any} The data or array of data if found, null otherwise
     */
    _findClosest(root, dataToFind, currentClosestMatch) {
        // this branch has no better match
        if (!root)
            return currentClosestMatch;
        const valueComparison = this.compareNodesValue(dataToFind, root.datas[0]);
        // if perfect match
        if (valueComparison === 0) {
            currentClosestMatch.node = root;
            currentClosestMatch.absComparisonScore = 0;
            return currentClosestMatch;
        }
        // if new current best match
        if (Math.abs(valueComparison) < currentClosestMatch.absComparisonScore) {
            currentClosestMatch.node = root;
            currentClosestMatch.absComparisonScore = Math.abs(valueComparison);
        }
        // if less
        if (valueComparison < 0)
            return this._findClosest(root.left, dataToFind, currentClosestMatch);
        // if greater
        else
            return this._findClosest(root.right, dataToFind, currentClosestMatch);
    }
    /**
     * Iterates through a tree and run the callback function on each node.
     *
     * @param {Function}              callback  The function to run on nodes
     * @param {BSTNode<T> | null}     root      The root of the tree
     */
    _forEach(callback, root) {
        if (!root)
            return;
        callback(root.datas);
        this._forEach(callback, root.left);
        this._forEach(callback, root.right);
    }
    /* DISPLAY METHODS */
    /**
     * Find the maximum string length a node value of the tree can be.
     *
     * @param {BSTNode<T> | null} root The root of the tree whose max value length we want.
     *
     * @returns  The maximum length found
     */
    _getMaxValueLength(root) {
        if (!root)
            return 0;
        if (!root.left && !root.right)
            return root.toString().length;
        const rootValueLength = root.toString().length;
        const leftMaxValueLength = this._getMaxValueLength(root.left);
        const rightMaxValueLength = this._getMaxValueLength(root.right);
        return Math.max(rootValueLength, leftMaxValueLength, rightMaxValueLength);
    }
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
    _createRowPrint(rowNodes, currentDepth, maxDepth, maxValueLength, linesLength) {
        // setup a few values
        const currentHeight = maxDepth - currentDepth;
        const nbrEnclosingSpacing = currentHeight > 0 ? Math.ceil(linesLength / Math.pow(2, currentDepth + 2)) : 1;
        const nbrOuterSpacing = nbrEnclosingSpacing * 2 + 1;
        const sideLength = currentHeight > 1 ? (nbrOuterSpacing - 2 - (maxValueLength + 2)) / 2 : 0;
        // init the variable that will contain the whole line
        let line = '';
        // 1. set the firsts enclosing spaces
        line += ' '.repeat(nbrEnclosingSpacing);
        // 2. add underscores | nodes | separating spaces
        for (let i = 0; i < rowNodes.length; i++) {
            const node = rowNodes[i];
            // if node is null fill with blank spaces
            if (!node)
                line += ' '.repeat((sideLength > 0 ? sideLength * 2 : 0) + 2 + maxValueLength);
            // else format the data
            else {
                // add left underscores
                if (node.left) {
                    if (sideLength > 2)
                        line += ` ${'_'.repeat(sideLength - 2)} `;
                    else if (sideLength > 0)
                        line += ' '.repeat(sideLength);
                }
                else
                    line += ' '.repeat(sideLength);
                // add node
                const nodeValue = node.toString();
                const valueLength = nodeValue.length;
                const lengthDiff = maxValueLength - valueLength;
                const leftSpacing = Math.floor(lengthDiff / 2);
                line += `${' '.repeat(lengthDiff - leftSpacing)}{${nodeValue}}${' '.repeat(leftSpacing)}`;
                // add right underscores
                if (node.right) {
                    if (sideLength > 2)
                        line += ` ${'_'.repeat(sideLength - 2)} `;
                    else if (sideLength > 0)
                        line += ' '.repeat(sideLength);
                }
                else
                    line += ' '.repeat(sideLength);
            }
            // if node is not the last, add separtingSpaces
            if (i < rowNodes.length - 1) {
                if (currentHeight === 0)
                    line += ' '.repeat(i % 2 ? 3 : 1);
                else
                    line += ' '.repeat(nbrOuterSpacing);
            }
        }
        // 3. set the lasts enclosing spaces
        line += ' '.repeat(nbrEnclosingSpacing);
        return line;
    }
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
    // eslint-disable-next-line prettier/prettier
    _createInterRowPrint(rowNodes, currentDepth, maxDepth, linesLength) {
        // setup a few values
        const currentHeight = maxDepth - currentDepth;
        const nbrEnclosingSpacing = currentHeight > 0 ? Math.ceil(linesLength / Math.pow(2, currentDepth + 2)) : 1;
        const nbrOuterSpacing = nbrEnclosingSpacing * 2 + 1;
        const nbrInnerSpacing = nbrOuterSpacing - (currentHeight <= 1 ? 6 : 4);
        let line = '';
        // 1. set the firsts enclosing spaces
        line += ' '.repeat(nbrEnclosingSpacing);
        for (let i = 0; i < rowNodes.length; i++) {
            const currentNode = rowNodes[i];
            line += currentNode && currentNode.left ? '/' : ' ';
            line += ' '.repeat(nbrInnerSpacing);
            line += currentNode && currentNode.right ? '\\' : ' ';
            if (i < rowNodes.length - 1)
                line += ' '.repeat(nbrOuterSpacing);
        }
        // 1. set the lasts enclosing spaces
        line += ' '.repeat(nbrEnclosingSpacing);
        return line;
    }
}
exports.BinarySearchTree = BinarySearchTree;
