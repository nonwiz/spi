import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from "db"

type Data = {
}


export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const reqSession = await getSession({req});
    const { name, code, codeType } = req.body;
    await prisma.generalInfo.create({
        data: {
            name, code, codeType
        }
    })
    res.status(200).json({error: false, message: "short_code is created"})
}

