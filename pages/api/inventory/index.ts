import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from "db"
import { Role } from "@prisma/client";

type Data = {
  user: object,
  department?: object,
  location?: object,
  error?: string,
  orderTypes?: object[]
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const reqSession = await getSession({ req });
  if (reqSession) {
    const locations = await prisma.location.findMany({
      include: {
        items: true,
        users: true,
      }
    })
    const user = await prisma.user.findUnique({
      where: { email: reqSession.user.email }, include: {
        department: true,
        location: true,
       
      }
    })
    const allUsers = await prisma.user.findMany({});
    const code_list = await prisma.codeName.findMany();
    const items = locations.map(item => item.items).flat()
    return res.status(200).json({ user, allUsers, items, locations, code_list })
  }
  res.status(500).json({ error: "not authorized" })
}


