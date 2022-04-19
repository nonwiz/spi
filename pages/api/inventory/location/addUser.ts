import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from "db"
import { Role, Zone } from "@prisma/client";

type Data = {
    location: Object,
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const reqSession = await getSession({ req });
  const { email, lid } = req.body;
  if (reqSession) {
      const location = await prisma.location.update({
          where: {
              id: lid
          },
          data: {
            users: {
                connect: [{email}]
            }
          }
        })

   return res.status(200).json({ location })
  }
  res.status(500).json({ error: "not authorized" })
}


