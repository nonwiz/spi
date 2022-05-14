import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from "db"
import { Role, Zone } from "@prisma/client";

type Data = {
  name: String,
  location: String,
}


const formatItem = (item) => {
  const { name, code, isAsset, type, location_id, description, price, order_date, depreciation, quantity, quantity_unit } = item
  const data = {name, code, isAsset, type, description, price: Number(price), quantity: Number(quantity), order_date: new Date(order_date), depreciation: new Date(depreciation), quantity_unit }
  console.log({"before_format": data})

  if (data.isAsset == "true" || data.isAsset == "TRUE") {
    data["isAsset"] = true;
    console.log("updated asset")
  } else {
    data["isAsset"] = false;
  }

  if (isNaN(data.order_date)) {
    delete data["order_date"];
  }
  if (isNaN(data.depreciation)) {
    delete data["depreciation"];
  }
  data["location_id"] = Number(location_id)

// console.log("Formatted", data )
return data;
}


export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const reqSession = await getSession({ req });
  const { items: temp } = req.body;
  if (reqSession) {
  const items = JSON.parse(temp);
  const formatedItem = items.map(item => formatItem(item));
    const itemsQuery = await prisma.item.createMany({
      data: [...formatedItem]
    });
    return res.status(200).json({error: false, message: "imported", items: itemsQuery})
  }
  res.status(500).json({ error: "not authorized" })
}


