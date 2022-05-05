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
    const {name, department, location} = req.body;
    const user = await prisma.user.update({
      where: { email: reqSession.user.email }, 
      data: {
        name,
        department: {
          connect: {id: Number(department)}
        },
        location: {
          connect: {id: Number(location)}
        }
      },
      include: {
        department: true,
        location: {
          include: {
            items: true,
          }
        },
        order_requests: {
          include: {
            order_items: true,
            approval_by: true,
            comment_by: true
          }
        },
      }
    })
    const orderTypes = await prisma.orderType.findMany();
    return res.status(200).json({ user, orderTypes })
  }
  res.status(500).json({ error: "not authorized" })
}


