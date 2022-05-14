import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from "db"
import { Role } from "@prisma/client";

type Data = {
  name: String,
  location: String,
}


const formatItem = (item) => {
  const { name, code, codeType } = item
  return ({name, code, codeType})
}


export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const reqSession = await getSession({ req });
  const { items: temp } = req.body;
  if (reqSession) {
  const items = JSON.parse(temp);
  const formatedItem = items.map(item => formatItem(item));
    const itemsQuery = await prisma.codeName.createMany({
      data: [...formatedItem]
    });
    return res.status(200).json({error: false, message: "imported", items: itemsQuery})
  }
  res.status(500).json({ error: "not authorized" })
}


