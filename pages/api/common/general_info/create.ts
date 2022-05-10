import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from "db"

type Data = {
}


export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const reqSession = await getSession({req});
    const { name, type} = req.body;
    await prisma.generalInfo.create({
        data: {
            name, type
        }
    })
    res.status(200).json({error: false, message: "general_info created"})
}

