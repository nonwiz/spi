import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from "db"
import { Role, Zone } from "@prisma/client";

type Data = {
    name: String,
    location: String,
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const reqSession = await getSession({ req });
  const { name, location, description, price, order_date, depreciation, quantity, quantity_unit } = req.body;
  const data = { name, location, description, price: Number(price), quantity: Number(quantity), order_date: new Date(order_date), depreciation: new Date(depreciation), quantity_unit}

 if (isNaN(order_date)) {
    delete data["order_date"];
  }
  if (isNaN(depreciation)) {
    delete data["depreciation"];
  }
  console.log({data})
if (reqSession) {
    const item = await prisma.item.create({
        data: {
        ...data,
        price: Number(price),
            connect: {
                id: Number(location)
            }
        }
    }

    })
   return res.status(200).json({ item })
  }
  res.status(500).json({ error: "not authorized" })
}


