import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from "db"
import { Role, Zone } from "@prisma/client";

type Data = {
  error: boolean,
  message: string,
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const reqSession = await getSession({ req });

  const { item_id } = req.body;
  if (reqSession) {
    const item = await prisma.item.delete({
      where: {
        id: Number(item_id)
      }
   });
    return res.status(200).json({error: false, message: "Deleted successfully"})
  }
  res.status(500).json({ error: true, message: "not authorized" })
}


