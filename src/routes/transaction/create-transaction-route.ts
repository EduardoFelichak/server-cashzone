import { z } from "zod"
import { prisma } from "../../lib/prisma"
import { FastifyInstance } from "fastify"
import { getRecurrentMonth } from "../../lib/get-recurrent-month"

export async function createTransaction(app: FastifyInstance)
{
    app.post('/transactions', async (request, reply) =>{
        const createTransactionBody = z.object({
            title: z.string(),
            value: z.number(),
            month: z.preprocess((arg) =>{
                return new Date(arg as string)
            }, z.date()),
            categoryId: z.number().int(),
            recurrent: z.boolean(),
            recurrenceMonths: z.number().optional(),
            userId: z.string()
        })

        const { title, value, month, categoryId, recurrent, recurrenceMonths, userId } = createTransactionBody.parse(request.body)

        if (recurrent && recurrenceMonths) {
            let transactionIds = [];
            for(let i = 1; i <= recurrenceMonths; i++) {
                const recurringMonth = getRecurrentMonth(month.toISOString(), i);
                const transaction = await prisma.transaction.create({
                    data: {
                        title,
                        value,
                        month: recurringMonth,
                        categoryId,
                        recurrent,
                        recurrenceMonths: i,
                        userId,
                    }
                })
                transactionIds.push(transaction.transactionId);  // Assumindo que 'id' é a propriedade correta
            }
            return reply.status(201).send({ allTransactions: transactionIds });
        } else {
            const transaction = await prisma.transaction.create({
                data: {
                    title,
                    value,
                    month,
                    categoryId,
                    recurrent,
                    recurrenceMonths,
                    userId,
                }
            })
            return reply.status(201).send({ transactionId: transaction.transactionId })
        }
    })
}