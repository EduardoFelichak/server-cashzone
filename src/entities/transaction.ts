export interface TransactionProps
{
        transactionId: Number
                title: string
                value: Number
                month: Date
           categoryId: Number
            recurrent: boolean
    recurrenceMonths?: Number
               userId: string
} 

export class Transaction
{
    private props: TransactionProps

    get transactionId()
    {
        return this.props.transactionId
    }

    get title()
    {
        return this.props.title
    }
    
    get value()
    {
        return this.props.value
    }

    get month()
    {
        return this.props.month
    }
    get categoryId()
    {
        return this.props.categoryId
    }

    get recurrent()
    {
        return this.props.recurrent
    }

    get recurrenceMonths()
    {
        return this.props.recurrenceMonths
    }

    get userId()
    {
        return this.props.userId
    }

    constructor(props: TransactionProps)
    {
        const { transactionId, title, value, month, categoryId, recurrent, recurrenceMonths, userId } = props

        if(recurrenceMonths && !recurrent)
            throw new Error('Cannot create an transaction with recurrence days and without recurrent informed as true')

        this.props = props
    }
}