import { setMonth, parseISO } from 'date-fns'

export function getRecurrentMonth (date: string, countMonth: number): Date 
{
    return setMonth(parseISO(date), new Date().getMonth() + countMonth)
}