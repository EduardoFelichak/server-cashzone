import { z } from 'zod'
import { prisma } from "../../../lib/prisma"
import { FastifyInstance } from "fastify"

export async function getCategories(app: FastifyInstance)
{
    app.get('/categories/:userId', async (request, reply)=>{
        const getUserParams = z.object({
            userId: z.string().cuid(),
        })

        const { userId } = getUserParams.parse(request.params)

        const categories = await prisma.category.findMany({
            where: {
                userId: userId
            }
        })

        if (!categories)
            return reply.status(400).send({ message: 'Categories not found for this user.' })
      

        return reply.send({ categories })
    })
}