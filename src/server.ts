import { fastify } from "fastify"
import { createUser } from "./routes/user/create-user-route"
import { createCategory } from "./routes/category/create-category-route"
import { createTransaction } from "./routes/transaction/create-transaction-route"

const app = fastify()

app.register(createUser)
app.register(createCategory)
app.register(createTransaction)

app.listen({ port: 3333 }).then(() => {
    console.log('HTTP server running!')
})