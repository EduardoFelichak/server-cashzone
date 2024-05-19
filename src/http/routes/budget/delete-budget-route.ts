import { z } from "zod"
import { prisma } from "../../../lib/prisma"
import { FastifyInstance } from "fastify"

export async function deleteBudget(app: FastifyInstance)
{
    app.delete('/budgets/:userId/:budgetId', async (request, reply) =>{
        const getParams = z.object({
            userId: z.string().cuid(),
            budgetId: z.string(),
        })

        const { userId, budgetId } = getParams.parse(request.params)

        const budget = await prisma.budget.delete({
            where: {
                userId,
                budgetId: Number(budgetId),
            }
        })

        if(!budget)
            return reply.status(404).send({ message: 'Budget not found.' })

        return reply.status(201).send({ message: 'Budget deleted successfully!' })
    })
}