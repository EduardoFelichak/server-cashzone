import { z } from 'zod'
import { prisma } from "../../../lib/prisma"
import { FastifyInstance } from "fastify"

export async function updateTransaction(app: FastifyInstance)
{
    app.put("/transactions/:userId/:transactionId", async (request, reply) =>{
        const getParams = z.object({
            userId: z.string().cuid(),
            transactionId: z.string(),
        })

        const getTransactionBody = z.object({
            title: z.string().optional(),
            value: z.number().optional(),
            categoryId: z.number().int().optional(),
        })

        const params = getParams.parse(request.params)

        const { title, value, categoryId } = getTransactionBody.parse(request.body)

        const transaction = await prisma.transaction.update({
            where: {
                userId: params.userId,
                transactionId: Number(params.transactionId),
            },
            data: {
                title, 
                value,
                categoryId,
            }
        })

        if(!transaction)
            return reply.status(404).send({ message: 'Transaction not found' })

        return reply.status(201).send({
            message: 'Transaction updated successfully!',
            transactionId: transaction.transactionId,
        })
    })
}