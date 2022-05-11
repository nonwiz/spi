import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from "db"
import { Role } from "@prisma/client";

type Data = {
  users?: object[],
  message: string,
  error: boolean,
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  
  const reqSession = await getSession({req});
  if (reqSession && reqSession?.user?.role == "admin") {
   const [users, orderTypes] = await prisma.$transaction([
        prisma.user.findMany({
          include: {
            department: true,
            location: true
          }
        }),
        prisma.orderType.findMany()
    ])
    return res.status(200).json({  users, roles: Object.keys(Role), orderTypes })
  }
  res.status(401).json({error: true, message: "permission denied"})
}

// This api route is for admin to fetch the list of users, departments, and locations.
