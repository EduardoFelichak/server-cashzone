import { fastify } from "fastify"
import { createUser } from "./http/routes/user/create-user-route"
import { getUser } from "./http/routes/user/get-user-route"
import { createCategory } from "./http/routes/category/create-category-route"
import { getCategories } from "./http/routes/category/get-categories-route"
import { createTransaction } from "./http/routes/transaction/create-transaction-route"
import { getTransactions, getTransactionsPerMonth } from "./http/routes/transaction/get-transactions-route"
import { createBudget } from "./http/routes/budget/create-budget-route"
import { getBudgets } from "./http/routes/budget/get-budgets-route"

const app = fastify()

//for user
app.register(createUser)
app.register(getUser)

//for category
app.register(createCategory)
app.register(getCategories)

//for transaction
app.register(createTransaction)
app.register(getTransactions)
app.register(getTransactionsPerMonth)

//for budget
app.register(createBudget)
app.register(getBudgets)

app.listen({ port: 3333 }).then(() => {
    console.log('HTTP server running!')
})