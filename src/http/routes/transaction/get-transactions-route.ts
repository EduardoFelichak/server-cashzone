import { z } from 'zod'
import { prisma } from "../../../lib/prisma"
import { FastifyInstance } from "fastify"

export async function getTransactions(app: FastifyInstance)
{
    app.get('/transactions/:userId', async (request, reply)=>{
        const getParams = z.object({
            userId: z.string().cuid(),
        })

        const { userId } = getParams.parse(request.params)

        const transactions = await prisma.transaction.findMany({
            where:{
                userId,
            }
        })

        if (!transactions)
            return reply.status(400).send({ message: 'Transactions not found for this user.' })   
        
        return reply.send({ transactions })
    })
}

export async function getTransactionsPerMonth(app: FastifyInstance)
{
    app.get('/transactions/:userId/:month', async (request, reply)=>{
        const getParams = z.object({
            userId: z.string().cuid(),
            month: z.preprocess((arg) => {
                return new Date(arg + 'T00:00:00')
            }, z.date()),
        })

        const { userId, month } = getParams.parse(request.params)

        const transactions = await prisma.transaction.findMany({
            where:{
                userId,
                month, 
            }
        })

        if(!transactions)
            return reply.status(400).send({ message: 'Transactions not found for this user.' }) 

            return reply.send({ transactions })
    })
}