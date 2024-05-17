import { z } from "zod"
import { prisma } from "../../../lib/prisma"
import { FastifyInstance } from "fastify"

export async function createBudget(app: FastifyInstance) 
{
    app.post('/budgets', async (request, reply) => {
        const createBudgetBody = z.object({
            title: z.string(),
            value: z.number(),
            categoryId: z.number(),
            month: z.preprocess((arg) => {
                return new Date(arg + 'T00:00:00')
            }, z.date()),
            userId: z.string().cuid(),
        })

        const { title, value, categoryId, month, userId } = createBudgetBody.parse(request.body)

        const budget = await prisma.budget.create({
            data: {
                title,
                value,
                categoryId,
                month,
                userId,
            }
        })

        return reply.status(201).send({ budgetId: budget.budgetId })
    })    
}