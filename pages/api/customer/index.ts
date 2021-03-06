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
    const user = await prisma.user.findUnique({
      where: { email: reqSession.user.email }, include: {
        department: true,
        location: {
          include: {
            items: true,
            order_requests: {
              include: {
                order_items: true,
                comment_by: true,
                approval_by: true,
              }
            }
          }
        },
        
      }
    })
    return res.status(200).json({ user })
  }
  res.status(200).json({ error: true, message: "Permission denied" })
}


