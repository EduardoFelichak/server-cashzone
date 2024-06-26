import { fastify } from "fastify"
import { createUser } from "./http/routes/user/create-user-route"
import { getUser } from "./http/routes/user/get-user-route"
import { updateUser } from "./http/routes/user/update-user-route"
import { deleteUser } from "./http/routes/user/delete-user-route"
import { createCategory } from "./http/routes/category/create-category-route"
import { getCategories } from "./http/routes/category/get-categories-route"
import { updateCategory } from "./http/routes/category/update-category-route"
import { deleteCategory } from "./http/routes/category/delete-category-route"
import { createTransaction } from "./http/routes/transaction/create-transaction-route"
import { getTransactions, getTransactionsPerMonth } from "./http/routes/transaction/get-transactions-route"
import { getCountRecurrence } from "./http/routes/transaction/get-count-recurrence-route"
import { updateTransaction } from "./http/routes/transaction/update-transaction-route"
import { deleteTransaction } from "./http/routes/transaction/delete-transaction-route"
import { createBudget } from "./http/routes/budget/create-budget-route"
import { getBudgets, getBudgetsPerMonth } from "./http/routes/budget/get-budgets-route"
import { updateBudget } from "./http/routes/budget/update-budget-route"
import { deleteBudget } from "./http/routes/budget/delete-budget-route"

const app = fastify()

//for user
app.register(createUser)
app.register(getUser)
app.register(updateUser)
app.register(deleteUser)

//for category
app.register(createCategory)
app.register(getCategories)
app.register(updateCategory)
app.register(deleteCategory)

//for transaction
app.register(createTransaction)
app.register(getTransactions)
app.register(getTransactionsPerMonth)
app.register(getCountRecurrence)
app.register(updateTransaction)
app.register(deleteTransaction)

//for budget
app.register(createBudget)
app.register(getBudgets)
app.register(getBudgetsPerMonth)
app.register(updateBudget)
app.register(deleteBudget)

app.listen({ port: 3333 }).then(() => {
    console.log('HTTP server running!')
})