import { expect, test } from 'vitest'
import { Category } from '../category'
import { randomUUID } from 'crypto'

test('Create an category with type income', () =>{
    const category = new Category({
        categoryId: 1,
        title: 'Salary',
        icon: '💼',
        type: 'Income',
        userId: randomUUID(),
    })

    expect(category).toBeInstanceOf(Category)
})

test('Create an category with type expense', () =>{
    const category = new Category({
        categoryId: 2,
        title: 'Grocery',
        icon: '🍊',
        type: 'Expense',
        userId: randomUUID(),
    })

    expect(category).toBeInstanceOf(Category)
})