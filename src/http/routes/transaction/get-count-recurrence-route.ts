import { z } from "zod"
import { prisma } from "../../../lib/prisma"
import { FastifyInstance } from "fastify"

export async function getCountRecurrence(app: FastifyInstance)
{
    app.get('/transactions/count/:userId/:transactionId', async (request, reply) =>{
        const getParams = z.object({
            userId: z.string().cuid(),
            transactionId: z.string(),
        })

        const { userId, transactionId } = getParams.parse(request.params)

        const count = await prisma.transaction.count({
            where:{
                userId,
                OR: [
                    { transactionId: Number(transactionId) },
                    { originalId: Number(transactionId) },
                ]
            }
        })

        if(!count)
            return reply.status(404).send({ message: 'Transactions not found.' })

        return reply.status(201).send({ countRecurrence: count })
    })
}