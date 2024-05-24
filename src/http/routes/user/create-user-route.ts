import { z } from "zod"
import { prisma } from "../../../lib/prisma"
import { FastifyInstance } from "fastify"

export async function createUser(app: FastifyInstance) 
{
    app.post('/users', async (request, reply) => {
        const createUserBody = z.object({
            firstName: z.string(), 
            lastName: z.string(),
            email: z.string().email(),
        })

        const { firstName, lastName, email } = createUserBody.parse(request.body)

        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
            }
        })

        return reply.status(201).send({ userId: user.userId })
    })
}