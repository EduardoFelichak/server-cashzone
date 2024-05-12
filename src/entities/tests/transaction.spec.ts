import { expect, test } from 'vitest'
import { Transaction } from '../transaction'
import { randomUUID } from 'crypto'

test('Create an normal transaction',() => {
    const transaction = new Transaction({
        transactionId: 1,
        title: 'Salary received',
        value: 2100.00,
        month: new Date('2024-05-01'),
        categoryId: 1,
        recurrent: false,
        userId: randomUUID(),
    })

    expect(transaction).toBeInstanceOf(Transaction)
})

test('Create an recurrent transaction',() => {
    const transaction = new Transaction({
        transactionId: 1,
        title: 'Salary received',
        value: 2100.00,
        month: new Date('2024-05-01'),
        categoryId: 1,
        recurrent: true,
        recurrenceMonths: 12,
        userId: randomUUID(),
    })

    expect(transaction).toBeInstanceOf(Transaction)
})

test('Cannot create an transaction with recurrence months and without recurrent informed as true',() => {
    expect(() => {
        return new Transaction({
            transactionId: 1,
            title: 'Salary received',
            value: 2100.00,
            month: new Date('2024-05-01'),
            categoryId: 1,
            recurrent: false,
            recurrenceMonths: 12,
            userId: randomUUID(),
        })
    }).toThrow()
})

