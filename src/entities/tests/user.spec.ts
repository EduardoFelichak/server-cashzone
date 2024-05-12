import { expect, test } from 'vitest'
import { User } from '../user'
import { randomUUID } from 'crypto'

test('create an user', () => {
    const user = new User({
        userId: randomUUID(),
        firstName: 'Eduardo',
        lastName: 'Felichak',
        email: 'edukf90@gmail.com',
    })

    expect(user).toBeInstanceOf(User)
})