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
    const { type } = req.body;
    const orderType = await prisma.orderType.create({
      data: {
        type
      }
    })
     return res.status(200).json({  orderType })
  }
  res.status(500).json({error: "not authorized"})
}


