import { expect, test } from 'vitest'
import { Budget } from '../budget'
import { randomUUID } from 'crypto'

test('Create an budget', () => {
    const budget = new Budget({
        budgetId: 1,
        title: 'Max expense for Petshop',
        value: 500.00,
        categoryId: 6,
        initialDate: new Date('2024-05-01'),
        finalDate: new Date('2024-07-01'),
        userId: randomUUID(),
    })

    expect(budget).toBeInstanceOf(Budget)
})

test('Cannot create an budget with final date before initial date', () => {
    expect(() => {
        return new Budget({
            budgetId: 1,
            title: 'Max expense for Petshop',
            value: 500.00,
            categoryId: 6,
            initialDate: new Date('2025-05-01'),
            finalDate: new Date('2024-07-01'),
            userId: randomUUID(),
        })
    }).toThrow()
}) 