import { z } from 'zod'
import { prisma } from "../../../lib/prisma"
import { FastifyInstance } from "fastify"

export async function getUser(app: FastifyInstance)
{
    app.get('/users/:userId', async (request, reply)=>{
        const getParams = z.object({
            userId: z.string().cuid(),
        })

        const { userId } = getParams.parse(request.params)

        const user = await prisma.user.findUnique({
            where:{
                userId,
            }
        })

        if(!user)
            return reply.status(400).send({ message: 'User not found.' })

        return reply.send({ user })
    })
}