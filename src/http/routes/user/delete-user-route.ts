import { z } from 'zod';
import { prisma } from "../../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function deleteUser(app: FastifyInstance) 
{
    app.delete('/users/:userId', async (request, reply) =>{
        const getParams =  z.object({
            userId: z.string().cuid(),
        })

        const { userId } = getParams.parse(request.params)

        const user = await prisma.user.delete({
            where: {
                userId,
            }
        })

        if(!user)
            return reply.status(404).send({ message: 'User not found.' })

        return reply.send({ message: 'User deleted successfully!' })
    })
}