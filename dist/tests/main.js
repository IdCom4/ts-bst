"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const when_empty_spec_1 = require("./when-empty.spec");
const BinarySearchTree_1 = require("../BinarySearchTree");
const framework_1 = require("./framework");
// running tests for cases where bst is created empty
(0, when_empty_spec_1.default)();
const usersArray = [
    { name: 'John', lastName: 'Doe', age: 18 },
    { name: 'Tom', lastName: 'Jedusor', age: 97 },
    { name: 'Jeanne', lastName: 'Calment', age: 123 },
    { name: 'Mickey', lastName: 'Mouse', age: 84 },
    { name: 'Bob', lastName: 'Sponge', age: 37 },
    { name: 'Big', lastName: 'foot', age: 2357 },
    { name: 'My', lastName: 'Grandpa', age: 97 },
    { name: 'Santa', lastName: 'Claus', age: 1752 },
];
(0, framework_1.test)('should invert the tree', () => {
    const compareData = (user1, user2) => user1.age - user2.age;
    const compareDataInReverse = (user1, user2) => compareData(user1, user2) * -1;
    const dataToString = (user) => `${user.name} ${user.lastName}`;
    const bst = new BinarySearchTree_1.BinarySearchTree(usersArray, true, compareData, dataToString);
    const bstSortedInReverse = new BinarySearchTree_1.BinarySearchTree(usersArray, true, compareDataInReverse, dataToString);
    bst.invert();
    const strBst = JSON.stringify(bst);
    const strBstInReverse = JSON.stringify(bstSortedInReverse);
    if (strBst !== strBstInReverse)
        return (0, framework_1.error)('Inverted tree and inverted by default tree were not equals');
    return (0, framework_1.success)();
});
(0, framework_1.test)('should find the data if present in the tree', () => {
    const compareData = (user1, user2) => user1.age - user2.age;
    const dataToString = (user) => `${user.name} ${user.lastName}`;
    const bst = new BinarySearchTree_1.BinarySearchTree(usersArray, true, compareData, dataToString);
    const result = bst.find(Object.assign({}, usersArray[0]));
    if (!result)
        return (0, framework_1.error)('did not found the data');
    if (compareData(usersArray[0], result))
        return (0, framework_1.error)('the found data does not match the query');
    return (0, framework_1.success)();
});
(0, framework_1.test)('should find all data duplicates if present in the tree', () => {
    const grandpa = { name: 'My', lastName: 'Grandpa', age: 97 };
    const jedusor = { name: 'Tom', lastName: 'Jedusor', age: 97 };
    const localUsersArray = [
        { name: 'John', lastName: 'Doe', age: 18 },
        jedusor,
        { name: 'Jeanne', lastName: 'Calment', age: 123 },
        { name: 'Mickey', lastName: 'Mouse', age: 84 },
        { name: 'Bob', lastName: 'Sponge', age: 37 },
        grandpa,
        { name: 'Santa', lastName: 'Claus', age: 1752 },
    ];
    const compareData = (user1, user2) => user1.age - user2.age;
    const dataToString = (user) => `${user.name} ${user.lastName}`;
    const bst = new BinarySearchTree_1.BinarySearchTree(localUsersArray, true, compareData, dataToString);
    const result = bst.findAll(Object.assign({}, grandpa));
    if (!result)
        return (0, framework_1.error)('did not found any data');
    if (result.length !== 2 || !result.find(result => result.lastName === grandpa.lastName) || !result.find(result => result.lastName === jedusor.lastName))
        return (0, framework_1.error)('the found data does not match the query');
    return (0, framework_1.success)();
});
(0, framework_1.test)('should find the closest data if present in the tree', () => {
    const santa = { name: 'Santa', lastName: 'Claus', age: 1752 };
    const localUsersArray = [
        { name: 'John', lastName: 'Doe', age: 18 },
        { name: 'Tom', lastName: 'Jedusor', age: 97 },
        { name: 'Jeanne', lastName: 'Calment', age: 123 },
        { name: 'Mickey', lastName: 'Mouse', age: 84 },
        { name: 'Bob', lastName: 'Sponge', age: 37 },
        { name: 'Big', lastName: 'foot', age: 2357 },
        { name: 'My', lastName: 'Grandpa', age: 97 },
        santa,
    ];
    const compareData = (user1, user2) => user1.age - user2.age;
    const dataToString = (user) => `${user.name} ${user.lastName}`;
    const bst = new BinarySearchTree_1.BinarySearchTree(localUsersArray, true, compareData, dataToString);
    const result = bst.findClosest(Object.assign(Object.assign({}, santa), { age: santa.age + 100 }));
    if (!result)
        return (0, framework_1.error)('did not found the data');
    if (JSON.stringify(result) !== JSON.stringify(santa))
        return (0, framework_1.error)('the found data does not match the query');
    return (0, framework_1.success)();
});
(0, framework_1.test)('should find all the closests data duplicates if present in the tree', () => {
    const grandpa = { name: 'My', lastName: 'Grandpa', age: 97 };
    const jedusor = { name: 'Tom', lastName: 'Jedusor', age: 97 };
    const localUsersArray = [
        { name: 'John', lastName: 'Doe', age: 18 },
        { name: 'Jeanne', lastName: 'Calment', age: 123 },
        { name: 'Mickey', lastName: 'Mouse', age: 84 },
        { name: 'Bob', lastName: 'Sponge', age: 37 },
        { name: 'Santa', lastName: 'Claus', age: 1752 },
        grandpa,
        jedusor,
    ];
    const compareData = (user1, user2) => user1.age - user2.age;
    const dataToString = (user) => `${user.name} ${user.lastName}`;
    const bst = new BinarySearchTree_1.BinarySearchTree(localUsersArray, true, compareData, dataToString);
    const result = bst.findClosests(Object.assign(Object.assign({}, grandpa), { age: 100 }));
    if (!result)
        return (0, framework_1.error)('did not found any data');
    if (result.length !== 2 || !result.find(result => result.lastName === grandpa.lastName) || !result.find(result => result.lastName === jedusor.lastName))
        return (0, framework_1.error)('the found data does not match the query');
    return (0, framework_1.success)();
});
(0, framework_1.test)('should insert new data in the tree', () => {
    const james = { name: 'James', lastName: 'Bond', age: 40 };
    const compareData = (user1, user2) => user1.age - user2.age;
    const dataToString = (user) => `${user.name} ${user.lastName}`;
    const bst = new BinarySearchTree_1.BinarySearchTree(usersArray, true, compareData, dataToString);
    bst.insert(james);
    const result = bst.find(Object.assign({}, james));
    if (!result)
        return (0, framework_1.error)('did not found the data');
    if (JSON.stringify(result) !== JSON.stringify(james))
        return (0, framework_1.error)('the found data does not match the query');
    return (0, framework_1.success)();
});
(0, framework_1.test)('should insert all the new data in the tree', () => {
    const grandpa = { name: 'My', lastName: 'Grandpa', age: 97 };
    const jedusor = { name: 'Tom', lastName: 'Jedusor', age: 97 };
    const localUsersArray = [
        { name: 'John', lastName: 'Doe', age: 18 },
        { name: 'Jeanne', lastName: 'Calment', age: 123 },
        { name: 'Mickey', lastName: 'Mouse', age: 84 },
        { name: 'Bob', lastName: 'Sponge', age: 37 },
        { name: 'Santa', lastName: 'Claus', age: 1752 }
    ];
    const compareData = (user1, user2) => user1.age - user2.age;
    const dataToString = (user) => `${user.name} ${user.lastName}`;
    const bst = new BinarySearchTree_1.BinarySearchTree(localUsersArray, true, compareData, dataToString);
    bst.insertMany([grandpa, jedusor]);
    const result = bst.findClosests(Object.assign(Object.assign({}, grandpa), { age: 100 }));
    if (!result)
        return (0, framework_1.error)('did not found any data');
    if (result.length !== 2 || !result.find(result => result.lastName === grandpa.lastName) || !result.find(result => result.lastName === jedusor.lastName))
        return (0, framework_1.error)('the found data does not match the query');
    return (0, framework_1.success)();
});
(0, framework_1.test)('should delete the data if present in the tree', () => {
    const santa = { name: 'Santa', lastName: 'Claus', age: 1752 };
    const localUsersArray = [
        { name: 'John', lastName: 'Doe', age: 18 },
        { name: 'Tom', lastName: 'Jedusor', age: 97 },
        { name: 'Jeanne', lastName: 'Calment', age: 123 },
        { name: 'Mickey', lastName: 'Mouse', age: 84 },
        { name: 'Bob', lastName: 'Sponge', age: 37 },
        { name: 'Big', lastName: 'foot', age: 2357 },
        { name: 'My', lastName: 'Grandpa', age: 97 },
        santa,
    ];
    const compareData = (user1, user2) => user1.age - user2.age;
    const dataToString = (user) => `${user.name} ${user.lastName}`;
    const bst = new BinarySearchTree_1.BinarySearchTree(localUsersArray, true, compareData, dataToString);
    const result = bst.find(Object.assign({}, santa));
    if (!result)
        throw new Error(`an unexpected error occurred`);
    bst.remove(Object.assign({}, santa));
    const emptyResult = bst.find(Object.assign({}, santa));
    if (emptyResult)
        return (0, framework_1.error)('data was not removed from the tree');
    return (0, framework_1.success)();
});
