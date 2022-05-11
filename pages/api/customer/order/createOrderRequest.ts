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
  const reqSession = await getSession({ req });
  // if (reqSession) {
  const fData = JSON.parse(req.body);
  // const purchase_reason = "For 1359 schedule";
  // let items = [{
  //   "description": "Radio for ESL111", "size": "sm", "quantity": "25", "type": "electronic", 'unit_price': "42", amount: ""
  // }, { "description": "Marker", "size": "sm", "quantity": "21", "type": "experiment", amount: "", 'unit_price': "" }]

  // }

  const items = fData.items.map(item => {
    const tmp = { ...item, quantity: Number(item.quantity), unit_price: Number(item.unit_price), total_price: Number(item.total_price) }
    return tmp;
  });
  let total_price = items.reduce((sum, item) => sum += item.total_price, 0)


  
  const orderReq = await prisma.orderRequest.create({
    data: {
      purchase_reason: fData.purchase_reason,
      total_price: Number(total_price),
      desired_date: new Date(fData.desired_date),
      order_items: {
        createMany: {
          data: [...items]
        }
      },
      location: {
        connect: {
          id: Number(fData.location_id),
        }
      }

    },
  })
 
  return res.status(200).json({ orderReq })
}
// res.status(500).json({ error: "not authorized" })
// }


