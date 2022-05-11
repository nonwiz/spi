import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from "db"
import { Role, Zone } from "@prisma/client";

type Data = {
  user: object,
  department?: object,
  location?: object,
  error?: string,
  orderTypes?: object[]
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const reqSession = await getSession({ req });
  if (reqSession) {
    const [orderRequests, user] = await prisma.$transaction([
      prisma.orderRequest.findMany({
      include: {
        order_items: true,
        approval_by: true,
        comment_by: true,
        location: true,
      }
    }), 
    prisma.user.findUnique({
      where: { email: reqSession.user.email }, include: {
        department: true,
        location: true,
       
      }
    })

  ])
    return res.status(200).json({ user, orderRequests, error: false, message: "fetched" })
  }
  res.status(500).json({ error: true, message: "not authorized" })
}


