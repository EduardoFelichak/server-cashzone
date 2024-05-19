import { z } from "zod"
import { prisma } from "../../../lib/prisma"
import { FastifyInstance } from "fastify"

export async function updateBudget(app: FastifyInstance)
{
    app.put('/budgets/:userId/:budgetId', async (request, reply) =>{
        const getParams = z.object({
            userId: z.string().cuid(),
            budgetId: z.string(),
        })

        const getBudgetBody = z.object({
            title: z.string().optional(),
            value: z.number().optional(),
            categoryId: z.number().int().optional(),
            month: z.preprocess((arg) => {
                return new Date(arg + 'T00:00:00')
            }, z.date()).optional(),
        })

        const params = getParams.parse(request.params)
        const { title, value, categoryId, month } = getBudgetBody.parse(request.body)

        const budget = await prisma.budget.update({
            where: {
                userId: params.userId,
                budgetId: Number(params.budgetId),
            },
            data: {
                title,
                value,
                categoryId,
                month,
            }
        })

        if(!budget)
            return reply.status(404).send({ message: 'Budget not found.' })

        return reply.status(201).send({
            message: 'Budget update successfully!',
            budgetId: budget.budgetId,
            month: budget.month,
        })
    })
}