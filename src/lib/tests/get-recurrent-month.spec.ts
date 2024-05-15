import { expect, test } from 'vitest'
import { getRecurrentMonth } from '../get-recurrent-month'

test('increases date by specified months', () => {
    const date = '2024-05-04';
    const resultDate = getRecurrentMonth(date, 1);
    const expectedDate = new Date(Date.UTC(2024, 5, 4)); // Configura como UTC

    // Formata para 'YYYY-MM-DD' e compara as strings
    expect(resultDate.toISOString().substring(0, 10)).toBe(expectedDate.toISOString().substring(0, 10));
});