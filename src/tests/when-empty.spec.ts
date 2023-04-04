import { success, error, test } from "./framework"
import { BinarySearchTree } from "../BinarySearchTree"

export default function tests() { 
  test('should instanciate an empty bst', () => {
    const bst = new BinarySearchTree([])
    return success()
  })

  test('should instanciate an empty bst and still perform find()', () => {
    const datas: number[] = []
    const bst = new BinarySearchTree(datas)
    if (bst.find(0)) return error('find() should not return something else than null if the tree is empty')
    return success()
  })

  test('should instanciate an empty bst and still perform findAll()', () => {
    const datas: number[] = []
    const bst = new BinarySearchTree(datas)
    if (bst.findAll(0)) return error('findAll() should not return something else than null if the tree is empty')
    return success()
  })

  test('should instanciate an empty bst and still perform findClosest()', () => {
    const datas: number[] = []
    const bst = new BinarySearchTree(datas)
    if (bst.findClosest(0)) return error('findClosest() should not return something else than null if the tree is empty')
    return success()
  })

  test('should instanciate an empty bst and still perform findClosests()', () => {
    const datas: number[] = []
    const bst = new BinarySearchTree(datas)
    if (bst.findClosests(0)) return error('findClosests() should not return something else than null if the tree is empty')
    return success()
  })

  test('should instanciate an empty bst and return null when getRoot() is called', () => {
    const datas: number[] = []
    const bst = new BinarySearchTree(datas)
    if (bst.getRoot()) return error('getRoot() should not return something else than null if the tree is empty')
    return success()
  })

  test('should instanciate an empty bst and do nothing when balance() is called', () => {
    const datas: number[] = []
    const bst = new BinarySearchTree(datas)
    try {
      bst.balance()
    } catch (e) {
      return error('balance() should not do anything but not throw')
    }
    return success()
  })

  test('should instanciate an empty bst and do nothing when invert() is called', () => {
    const datas: number[] = []
    const bst = new BinarySearchTree(datas)
    try {
      bst.invert()
    } catch (e) {
      return error('invert() should not do anything but not throw')
    }
    return success()
  })

  test('should instanciate an empty bst and do nothing when remove() is called', () => {
    const datas: number[] = []
    const bst = new BinarySearchTree(datas)
    try {
      bst.remove(0)
    } catch (e) {
      return error('remove() should not do anything but not throw')
    }
    return success()
  })
}

test('should find the data if present in the tree', () => {
  const datas: number[] = []
  const bst = new BinarySearchTree(datas)

  bst.insert(4)
  const result = bst.find(4)

  if (!result)
    return error('data was not inserted inside the empty tree')
  if (result !== 4)
    return error('the found data does not match the inserted one')
  
  return success()
})