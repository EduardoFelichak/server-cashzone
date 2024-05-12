export interface UserProps
{
       userId: string
    firstName: string 
     lastName: string
        email: string 
}

export class User
{
    private props: UserProps

    get userId()
    {
        return this.props.userId
    }

    get firstName()
    {
        return this.props.firstName
    }

    get lastName()
    {
        return this.props.lastName
    }

    get email()
    {
        return this.props.email
    }

    constructor(props: UserProps)
    {
        const { userId, firstName, lastName, email } = props

        this.props = props
    }
}