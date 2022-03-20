import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from "db"

type Data = {
  users?: object[],
  error?: string,
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const reqSession = await getSession({req});
    if (reqSession && reqSession?.user?.role == "admin") {
        const users = await prisma.user.findMany();
        console.log(users, typeof(users))
        return res.status(200).json({  users })
    }
    res.status(500).json({error: "not authorized"})
}


