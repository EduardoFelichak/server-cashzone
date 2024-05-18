import { z } from 'zod'
import { prisma } from "../../../lib/prisma"
import { FastifyInstance } from "fastify"

export async function updateCategory(app: FastifyInstance)
{
    app.put('/categories/:userId/:categoryId', async (request, reply) =>{
        const getParams = z.object({
            userId: z.string().cuid(),
            categoryId: z.number()
        })

        const getCategoryBody = z.object({
            title: z.string().optional(),
            icon: z.string().optional(),
            type: z.string().optional(),
        })

        const params = getParams.parse(request.params)
        const { title, icon, type } = getCategoryBody.parse(request.body)

        const category = await prisma.category.update({
            where:{
                userId: params.userId,
                categoryId: params.categoryId,
            },
            data:{
                title,
                icon,
                type,
            }
        })

        if(!category)
            return reply.status(404).send({ message: 'Category not found.' })    

        return reply.status(201).send({
            message: 'Category updated successfully!',
            categoryId: category.categoryId,
        })
    })
}