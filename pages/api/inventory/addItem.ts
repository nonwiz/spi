import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from "db"

type Data = {
  name: String,
  location: String,
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const reqSession = await getSession({ req });
  const { name, code, type, location_id, description, price, order_date, depreciation, quantity, quantity_unit } = req.body;
  const data = {name, code, type, description, price: Number(price), quantity: Number(quantity), order_date: new Date(order_date), depreciation: new Date(depreciation), quantity_unit }
  if (data.price >= 6000) {
    data["isAsset"] = true;
  }

  if (isNaN(data.order_date)) {
    // check if the order date is invalid or not
    delete data["order_date"];
  }
  if (isNaN(data.depreciation)) {
    // check if the depreciation date is valid or not
    delete data["depreciation"];
  }

  if (reqSession) {
    const item = await prisma.item.create({
      data: {
        ...data,
        location: {
          connect: {
            id: Number(location_id)
          }
        }
      }
    });
    return res.status(200).json({item})
  }
  res.status(500).json({ error: "not authorized" })
}


