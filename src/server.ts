import { fastify } from "fastify"
import { createUser } from "./routes/user/create-user-route"
import { createCategory } from "./routes/category/create-category-route"
import { getCategories } from "./routes/category/get-categories-route"
import { createTransaction } from "./routes/transaction/create-transaction-route"
import { getTransactions } from "./routes/transaction/get-transactions-route"


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