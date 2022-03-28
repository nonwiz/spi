import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from "db"
import { Role, Zone } from "@prisma/client";

type Data = {
  user?: object,
  department?: object,
  location?: object,
  error?: string,
  orderTypes?: object[]
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const reqSession = await getSession({req});
  if (reqSession ) {
    const fData = JSON.parse(req.body);
    const items = fData.items.map(item => {
      const tmp = {...item, connect: {type_id: Number(item["type"])}};
      delete tmp["type"];
      return tmp;
    })
    console.log({bdoy: req["body"]})
    const orderReq = await prisma.orderRequest.create({
      data: {
        purchase_reason: fData.purchase_reason,
        order_items: {
          createMany: {
            data: [...items]
          }
        },
        user: { 
          connect: {
            email: reqSession.user.email,
          }
        }

      },
    })
    console.log({orderReq})
    return res.status(200).json({})
  }
  res.status(500).json({error: "not authorized"})
}


