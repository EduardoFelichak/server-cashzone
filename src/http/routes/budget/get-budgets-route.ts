import { z } from 'zod'
import { prisma } from "../../../lib/prisma"
import { FastifyInstance } from "fastify"

export async function getBudgets(app: FastifyInstance)
{
    app.get('/budgets/:userId', async (request, reply)=>{
        const getParams = z.object({
            userId: z.string().cuid(),
        })

        const { userId } = getParams.parse(request.params)

        const budgets = await prisma.budget.findMany({
            where:{
                userId
            }
        })

        if (!budgets)
            return reply.status(400).send({ message: 'Budgets not found for this user.' }) 
    
        return reply.send({ budgets })
    })
}

export async function getBudgetsPerMonth(app: FastifyInstance)
{
    app.get('/budgets/:userId/:month', async (request, reply)=>{
        const getParams = z.object({
            userId: z.string().cuid(),
            month: z.preprocess((arg) => {
                return new Date(arg + 'T00:00:00')
            }, z.date()),
        })

        const { userId, month } = getParams.parse(request.params)

        const budgets = await prisma.budget.findMany({
            where:{
                userId,
                month, 
            }
        })

        if(!budgets)
            return reply.status(400).send({ message: 'Budgets not found for this user.' }) 

        return reply.send({ budgets })
    })
}
