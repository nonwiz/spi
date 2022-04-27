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
  const { orderId } = req.body;
  if (reqSession) {
    const user = await prisma.user.findUnique({
      where: { email: reqSession.user.email }
    })
    const order = await prisma.orderRequest.findUnique({
      where: { id: orderId },
      include: {
        approval_by: true
      }
    })
    // Check if this role already have approved or not yet
    if (order.approval_by.filter(approved => approved.role == user.role).length > 0) {
      console.log("Role, already approve")
      return res.status(200).json({ 'message': "already approved" })
    }
    const updatedOrder = await prisma.orderRequest.update({
      where: { id: orderId },
      data: {
        approval_by: {
          create: [{ user: user.email, role: user.role }]
        }
      },
      include: {
        approval_by: true
      }
    })
    // If 3 people have approved (purchase, finance, department head)
    if (updatedOrder.approval_by.length >= 3) {
      await prisma.orderRequest.update({
        where: { id: orderId },
        data: {
          approval_status: true,
        }
      })
    }

    console.log({ updatedOrder });
    return res.status(200).json({ "message": "approved order!", updatedOrder })
  }
  res.status(500).json({ error: "not authorized" })
}

