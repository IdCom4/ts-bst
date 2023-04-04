import whenEmptyTests from './when-empty.spec'
import { BinarySearchTree } from '../BinarySearchTree'
import { error, success, test } from './framework'

// running tests for cases where bst is created empty
whenEmptyTests()


interface IUser {
  name: string
  lastName: string,
  age: number
}

const usersArray: IUser[] = [
  { name: 'John', lastName: 'Doe', age: 18 },
  { name: 'Tom', lastName: 'Jedusor', age: 97 },
  { name: 'Jeanne', lastName: 'Calment', age: 123 },
  { name: 'Mickey', lastName: 'Mouse', age: 84 },
  { name: 'Bob', lastName: 'Sponge', age: 37 },
  { name: 'Big', lastName: 'foot', age: 2357 },
  { name: 'My', lastName: 'Grandpa', age: 97 },
  { name: 'Santa', lastName: 'Claus', age: 1752 },
]

test('should invert the tree', () => {
  const compareData = (user1: IUser, user2: IUser): number => user1.age - user2.age
  const compareDataInReverse = (user1: IUser, user2: IUser): number => compareData(user1, user2) * -1
  const dataToString = (user: IUser): string => `${user.name} ${user.lastName}`
  
  const bst = new BinarySearchTree<IUser>(usersArray, true, compareData, dataToString)
  const bstSortedInReverse = new BinarySearchTree<IUser>(usersArray, true, compareDataInReverse, dataToString)

  bst.invert()

  const strBst = JSON.stringify(bst)
  const strBstInReverse = JSON.stringify(bstSortedInReverse)

  if (strBst !== strBstInReverse) return error('Inverted tree and inverted by default tree were not equals')
  return success()

})

test('should find the data if present in the tree', () => {
  const compareData = (user1: IUser, user2: IUser): number => user1.age - user2.age
  const dataToString = (user: IUser): string => `${user.name} ${user.lastName}`
  
  const bst = new BinarySearchTree<IUser>(usersArray, true, compareData, dataToString)

  const result = bst.find({ ...usersArray[0] })

  if (!result)
    return error('did not found the data')
  if (compareData(usersArray[0], result))
    return error('the found data does not match the query')
  
  return success()
})

test('should find all data duplicates if present in the tree', () => {
  const grandpa = { name: 'My', lastName: 'Grandpa', age: 97 }
  const jedusor = { name: 'Tom', lastName: 'Jedusor', age: 97 }
  const localUsersArray: IUser[] = [
    { name: 'John', lastName: 'Doe', age: 18 },
    jedusor,
    { name: 'Jeanne', lastName: 'Calment', age: 123 },
    { name: 'Mickey', lastName: 'Mouse', age: 84 },
    { name: 'Bob', lastName: 'Sponge', age: 37 },
    grandpa,
    { name: 'Santa', lastName: 'Claus', age: 1752 },
  ]

  const compareData = (user1: IUser, user2: IUser): number => user1.age - user2.age
  const dataToString = (user: IUser): string => `${user.name} ${user.lastName}`
  
  const bst = new BinarySearchTree<IUser>(localUsersArray, true, compareData, dataToString)

  const result = bst.findAll({ ...grandpa })

  if (!result)
    return error('did not found any data')
  if (result.length !== 2 || !result.find(result => result.lastName === grandpa.lastName) || !result.find(result => result.lastName === jedusor.lastName))
    return error('the found data does not match the query')
  
  return success()
})

test('should find the closest data if present in the tree', () => {
  const santa = { name: 'Santa', lastName: 'Claus', age: 1752 }
  const localUsersArray: IUser[] = [
    { name: 'John', lastName: 'Doe', age: 18 },
    { name: 'Tom', lastName: 'Jedusor', age: 97 },
    { name: 'Jeanne', lastName: 'Calment', age: 123 },
    { name: 'Mickey', lastName: 'Mouse', age: 84 },
    { name: 'Bob', lastName: 'Sponge', age: 37 },
    { name: 'Big', lastName: 'foot', age: 2357 },
    { name: 'My', lastName: 'Grandpa', age: 97 },
    santa,
  ]
  const compareData = (user1: IUser, user2: IUser): number => user1.age - user2.age
  const dataToString = (user: IUser): string => `${user.name} ${user.lastName}`
  
  const bst = new BinarySearchTree<IUser>(localUsersArray, true, compareData, dataToString)

  const result = bst.findClosest({ ...santa, age: santa.age + 100 })

  if (!result)
    return error('did not found the data')
  if (JSON.stringify(result) !== JSON.stringify(santa))
    return error('the found data does not match the query')
  
  return success()
})

test('should find all the closests data duplicates if present in the tree', () => {
  const grandpa = { name: 'My', lastName: 'Grandpa', age: 97 }
  const jedusor = { name: 'Tom', lastName: 'Jedusor', age: 97 }
  const localUsersArray: IUser[] = [
    { name: 'John', lastName: 'Doe', age: 18 },
    { name: 'Jeanne', lastName: 'Calment', age: 123 },
    { name: 'Mickey', lastName: 'Mouse', age: 84 },
    { name: 'Bob', lastName: 'Sponge', age: 37 },
    { name: 'Santa', lastName: 'Claus', age: 1752 },
    grandpa,
    jedusor,
  ]

  const compareData = (user1: IUser, user2: IUser): number => user1.age - user2.age
  const dataToString = (user: IUser): string => `${user.name} ${user.lastName}`
  
  const bst = new BinarySearchTree<IUser>(localUsersArray, true, compareData, dataToString)

  const result = bst.findClosests({ ...grandpa, age: 100 })

  if (!result)
    return error('did not found any data')
  if (result.length !== 2 || !result.find(result => result.lastName === grandpa.lastName) || !result.find(result => result.lastName === jedusor.lastName))
    return error('the found data does not match the query')
  
  return success()
})

test('should insert new data in the tree', () => {
  const james: IUser = { name: 'James', lastName: 'Bond', age: 40 }

  const compareData = (user1: IUser, user2: IUser): number => user1.age - user2.age
  const dataToString = (user: IUser): string => `${user.name} ${user.lastName}`
  
  const bst = new BinarySearchTree<IUser>(usersArray, true, compareData, dataToString)

  bst.insert(james)

  const result = bst.find({ ...james })

  if (!result)
    return error('did not found the data')
  if (JSON.stringify(result) !== JSON.stringify(james))
    return error('the found data does not match the query')
  
  return success()
})

test('should insert all the new data in the tree', () => {
  const grandpa = { name: 'My', lastName: 'Grandpa', age: 97 }
  const jedusor = { name: 'Tom', lastName: 'Jedusor', age: 97 }
  const localUsersArray: IUser[] = [
    { name: 'John', lastName: 'Doe', age: 18 },
    { name: 'Jeanne', lastName: 'Calment', age: 123 },
    { name: 'Mickey', lastName: 'Mouse', age: 84 },
    { name: 'Bob', lastName: 'Sponge', age: 37 },
    { name: 'Santa', lastName: 'Claus', age: 1752 }
  ]

  const compareData = (user1: IUser, user2: IUser): number => user1.age - user2.age
  const dataToString = (user: IUser): string => `${user.name} ${user.lastName}`
  
  const bst = new BinarySearchTree<IUser>(localUsersArray, true, compareData, dataToString)

  bst.insertMany([grandpa, jedusor])

  const result = bst.findClosests({ ...grandpa, age: 100 })

  if (!result)
    return error('did not found any data')
  if (result.length !== 2 || !result.find(result => result.lastName === grandpa.lastName) || !result.find(result => result.lastName === jedusor.lastName))
    return error('the found data does not match the query')
  
  return success()
})

test('should delete the data if present in the tree', () => {
  const santa = { name: 'Santa', lastName: 'Claus', age: 1752 }
  const localUsersArray: IUser[] = [
    { name: 'John', lastName: 'Doe', age: 18 },
    { name: 'Tom', lastName: 'Jedusor', age: 97 },
    { name: 'Jeanne', lastName: 'Calment', age: 123 },
    { name: 'Mickey', lastName: 'Mouse', age: 84 },
    { name: 'Bob', lastName: 'Sponge', age: 37 },
    { name: 'Big', lastName: 'foot', age: 2357 },
    { name: 'My', lastName: 'Grandpa', age: 97 },
    santa,
  ]
  const compareData = (user1: IUser, user2: IUser): number => user1.age - user2.age
  const dataToString = (user: IUser): string => `${user.name} ${user.lastName}`
  
  const bst = new BinarySearchTree<IUser>(localUsersArray, true, compareData, dataToString)

  const result = bst.find({ ...santa })
  if (!result) throw new Error(`an unexpected error occurred`)

  bst.remove({ ...santa })

  const emptyResult = bst.find({ ...santa })
  if (emptyResult) return error('data was not removed from the tree')

  return success()
})