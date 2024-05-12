export interface CategoryProps
{
    categoryId: Number
         title: string
          icon: string 
          type: string 
        userId: string
}

export class Category
{
    private props: CategoryProps

    get categoryId()
    {
        return this.props.categoryId
    }

    get title()
    {
        return this.props.title
    }
    get icon()
    {
        return this.props.icon
    }

    get type()
    {
        return this.props.type
    }

    get userId()
    {
        return this.props.userId
    }

    constructor(props: CategoryProps)
    {
        const { categoryId, title, icon, type, userId } = props

        this.props = props
    }
}