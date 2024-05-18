import { z } from 'zod'
import { prisma } from "../../../lib/prisma"
import { FastifyInstance } from "fastify"

export async function deleteCategory(app: FastifyInstance)
{
    app.delete('/categories/:userId/:categoryId', async (request, reply) =>{
        const getParams = z.object({
            userId: z.string().cuid(),
            categoryId: z.number(),
        })

        const { userId, categoryId } = getParams.parse(request.params)

        const category = await prisma.category.delete({
            where: {
                userId, 
                categoryId,
            }
        })

        if(!category)
            return reply.status(404).send({ message: 'Category not found.' })

        return reply.send({ message: 'Category deleted successfully!' })
    })
}