import { z } from 'zod'
import { prisma } from "../../../lib/prisma"
import { FastifyInstance } from "fastify"

export async function updateUser(app: FastifyInstance) 
{
    app.put('/users/:userId', async (request, reply) =>{
        const getParams = z.object({
            userId: z.string().cuid(),
        })

        const getUserBody = z.object({
            firstName: z.string().optional(),
            lastName: z.string().optional(),
            email: z.string().email().optional(),
        })

        const params = getParams.parse(request.params)
        const { firstName, lastName, email } = getUserBody.parse(request.body)

        const user = await prisma.user.update({
            where:{
                userId: params.userId,
            },
            data:{
                firstName,
                lastName,
                email,
            }
        })

        if(!user)
            return reply.status(404).send({ message: 'User not found.' })

        return reply.status(201).send({
            message: 'User updated successfully!',
            userId: user.userId,
        })
    })     
}