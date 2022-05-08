import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from "db"

type Data = {
}


// Operation:
// Add | Update 

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const reqSession = await getSession({req});
    const { model, message, operation } = req.body;
    await prisma.log.create({
        data: {
            model, 
            message, 
            user: reqSession.user.email, 
            operation
        }
    })
    res.status(200).json({error: false, message: "log created"})
}

