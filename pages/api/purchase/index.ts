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
    const orderRequests = await prisma.orderRequest.findMany({
      include: {
        order_items: true,
        approval_by: true,
        comment_by: true,
        user: true,
      }
    })
    const user = await prisma.user.findUnique({
      where: { email: reqSession.user.email }, include: {
        department: true,
        location: true,
       
      }
    })
    const orderTypes = await prisma.orderType.findMany();
    return res.status(200).json({ user, orderTypes, orderRequests })
  }
  res.status(500).json({ error: "not authorized" })
}


