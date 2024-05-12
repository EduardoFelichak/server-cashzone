import { getSystemErrorMap } from "util"

export interface BudgetProps
{
       budgetId: Number
          title: string
          value: Number
     categoryId: Number
    initialDate: Date
      finalDate: Date
         userId: string
}

export class Budget
{
    private props: BudgetProps

    get budgetId()
    {
        return this.props.budgetId
    }

    get title()
    {
        return this.props.title
    }

    get value()
    {
        return this.props.value
    }

    get categoryId()
    {
        return this.props.categoryId
    }

    get initialDate()
    {
        return this.props.initialDate
    }

    get finalDate()
    {
        return this.props.finalDate
    }

    constructor(props: BudgetProps)
    {
        const { budgetId, title, value, categoryId, initialDate, finalDate } = props

        if(initialDate >= finalDate)
            throw new Error('Initial date needs to be less than final date')
        
        this.props = props
    }
}