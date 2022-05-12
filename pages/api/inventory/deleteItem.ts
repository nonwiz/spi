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
  const { item_id } = req.body;

   if (reqSession) {
    const item = await prisma.item.create({
    });
    return res.status(200).json({item})
  }
  res.status(500).json({ error: "not authorized" })
}


