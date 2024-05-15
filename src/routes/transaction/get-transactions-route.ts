import { z } from 'zod'
import { prisma } from "../../lib/prisma"
import { FastifyInstance } from "fastify"

export async function getTransactions(app: FastifyInstance)
{
    app.get('/transactions/:userId/:month', async (request, reply)=>{
        const getParams = z.object({
            userId: z.string().uuid(),
            month: z.preprocess((arg) =>{
                return new Date(arg as string)
            }, z.date())
        })

        const { userId, month } = getParams.parse(request.params)

        const transactions = await prisma.transaction.findMany({
            where:{
                userId: userId,
                month: month, 
            }
        })

        if(!transactions)
            return reply.status(400).send({ message: 'Transactions not found for this user.' }) 

            return reply.send({ transactions })
    })
}