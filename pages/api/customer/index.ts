import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from "db"
import { Role, Zone } from "@prisma/client";

type Data = {
  user: object,
  department?: object,
  location?: object,
  error?: string,
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const reqSession = await getSession({req});
  if (reqSession ) {
    const user = await prisma.user.findUnique({where: {email: reqSession.user.email}, include: {
      department: true,
      location: true,
      order_requests: {
        include: {
          order_items: true
        }
      },
    }})
    return res.status(200).json({ user })
  }
  res.status(500).json({error: "not authorized"})
}


