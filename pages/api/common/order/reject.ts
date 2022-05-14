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
  comment_by?: object[]
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const reqSession = await getSession({ req });
  const { orderId, comment } = req.body;
  if (reqSession) {
    const user = await prisma.user.findUnique({
      where: { email: reqSession.user.email }
    })
    const order = await prisma.orderRequest.update({
      where: { id: orderId },
      data: {
        remark: `Remarks ${user?.email}`,
        order_status: "Rejected"
      },
    })
    return res.status(200).json({ 'message': "reject complete" });
  }
}


