import { z } from "zod"
import { prisma } from "../../../lib/prisma"
import { FastifyInstance } from "fastify"

export async function deleteTransaction(app: FastifyInstance)
{
    app.delete('/transactions/:userId/:transactionId', async (request, reply) =>{
        const getParams = z.object({
            userId: z.string().cuid(),
            transactionId: z.string(),
        })

        const { userId, transactionId } = getParams.parse(request.params)

        const transaction = await prisma.transaction.delete({
            where: {
                userId,
                transactionId: Number(transactionId),
            }
        })

        if(!transaction)
            return reply.status(404).send({ message: 'Transaction not found.' })

        return reply.status(201).send({ message: 'Transaction deleted successfully!' })
    })
}