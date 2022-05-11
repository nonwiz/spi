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
  const { orderId } = req.body;
  if (reqSession) {
   
    const order = await prisma.orderRequest.update({
      where: { id: orderId },
      data: {
        order_status: "Cancelled",
      },
    })
    return res.status(200).json({ error: false, 'message': "set order to cancel" });
  }
}


