import { fastify } from "fastify"
import { createUser } from "./http/routes/user/create-user-route"
import { createCategory } from "./http/routes/category/create-category-route"
import { getCategories } from "./http/routes/category/get-categories-route"
import { createTransaction } from "./http/routes/transaction/create-transaction-route"
import { getTransactions } from "./http/routes/transaction/get-transactions-route"


const app = fastify()

//for user
app.register(createUser)

//for category
app.register(createCategory)
app.register(getCategories)

//for transaction
app.register(createTransaction)
app.register(getTransactions)

app.listen({ port: 3333 }).then(() => {
    console.log('HTTP server running!')
})