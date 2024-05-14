import { z } from "zod"
import { prisma } from "../../lib/prisma"
import { FastifyInstance } from "fastify"

export async function createCategory(app: FastifyInstance)
{
    app.post('/categories', async (request, reply) => {
        const createCategoryBody = z.object({
            title: z.string(),
            icon: z.string(),
            type: z.string(),
            userId: z.string()        
        })    

        const { title, icon, type, userId } = createCategoryBody.parse(request.body)

        const category = await prisma.category.create({
            data: {
                title,
                icon,
                type,
                userId,             
            }
        })

        return reply.status(201).send({ categoryId: category.categoryId })
    })
}