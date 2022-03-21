import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from "db"

type Data = {
  users?: object[],
  departments?: object[],
  locations?: object[],
  error?: string,
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const reqSession = await getSession({req});
    if (reqSession && reqSession?.user?.role == "admin") {
    const { id, budget } = req.body
    const department = await prisma.department.update({
      where: {
        id: Number(id),
      },
      data: {
        budget: Number(budget)
      }
    })
     return res.status(200).json({  department })
   }
    res.status(500).json({error: "not authorized"})
}

// This api route is for admin to fetch the list of users, departments, and locations.
