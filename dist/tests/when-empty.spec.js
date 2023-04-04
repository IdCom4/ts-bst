"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const framework_1 = require("./framework");
const BinarySearchTree_1 = require("../BinarySearchTree");
function tests() {
    (0, framework_1.test)('should instanciate an empty bst', () => {
        const bst = new BinarySearchTree_1.BinarySearchTree([]);
        return (0, framework_1.success)();
    });
    (0, framework_1.test)('should instanciate an empty bst and still perform find()', () => {
        const datas = [];
        const bst = new BinarySearchTree_1.BinarySearchTree(datas);
        if (bst.find(0))
            return (0, framework_1.error)('find() should not return something else than null if the tree is empty');
        return (0, framework_1.success)();
    });
    (0, framework_1.test)('should instanciate an empty bst and still perform findAll()', () => {
        const datas = [];
        const bst = new BinarySearchTree_1.BinarySearchTree(datas);
        if (bst.findAll(0))
            return (0, framework_1.error)('findAll() should not return something else than null if the tree is empty');
        return (0, framework_1.success)();
    });
    (0, framework_1.test)('should instanciate an empty bst and still perform findClosest()', () => {
        const datas = [];
        const bst = new BinarySearchTree_1.BinarySearchTree(datas);
        if (bst.findClosest(0))
            return (0, framework_1.error)('findClosest() should not return something else than null if the tree is empty');
        return (0, framework_1.success)();
    });
    (0, framework_1.test)('should instanciate an empty bst and still perform findClosests()', () => {
        const datas = [];
        const bst = new BinarySearchTree_1.BinarySearchTree(datas);
        if (bst.findClosests(0))
            return (0, framework_1.error)('findClosests() should not return something else than null if the tree is empty');
        return (0, framework_1.success)();
    });
    (0, framework_1.test)('should instanciate an empty bst and return null when getRoot() is called', () => {
        const datas = [];
        const bst = new BinarySearchTree_1.BinarySearchTree(datas);
        if (bst.getRoot())
            return (0, framework_1.error)('getRoot() should not return something else than null if the tree is empty');
        return (0, framework_1.success)();
    });
    (0, framework_1.test)('should instanciate an empty bst and do nothing when balance() is called', () => {
        const datas = [];
        const bst = new BinarySearchTree_1.BinarySearchTree(datas);
        try {
            bst.balance();
        }
        catch (e) {
            return (0, framework_1.error)('balance() should not do anything but not throw');
        }
        return (0, framework_1.success)();
    });
    (0, framework_1.test)('should instanciate an empty bst and do nothing when invert() is called', () => {
        const datas = [];
        const bst = new BinarySearchTree_1.BinarySearchTree(datas);
        try {
            bst.invert();
        }
        catch (e) {
            return (0, framework_1.error)('invert() should not do anything but not throw');
        }
        return (0, framework_1.success)();
    });
    (0, framework_1.test)('should instanciate an empty bst and do nothing when remove() is called', () => {
        const datas = [];
        const bst = new BinarySearchTree_1.BinarySearchTree(datas);
        try {
            bst.remove(0);
        }
        catch (e) {
            return (0, framework_1.error)('remove() should not do anything but not throw');
        }
        return (0, framework_1.success)();
    });
}
exports.default = tests;
(0, framework_1.test)('should find the data if present in the tree', () => {
    const datas = [];
    const bst = new BinarySearchTree_1.BinarySearchTree(datas);
    bst.insert(4);
    const result = bst.find(4);
    if (!result)
        return (0, framework_1.error)('data was not inserted inside the empty tree');
    if (result !== 4)
        return (0, framework_1.error)('the found data does not match the inserted one');
    return (0, framework_1.success)();
});
