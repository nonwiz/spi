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
  const reqSession = await getSession({ req });
  if (reqSession && reqSession?.user?.role == "admin") {
    const { location_id, department_id } = req.body
    const department = await prisma.department.update({
      where: {
        id: Number(department_id),
      },
      data: {
        locations: {
          connect: [{ location_id }],
        }
      }
    })
    return res.status(200).json({ department })
  }
  res.status(401).json({ error: true, message: "Permission denied" })
}

// This api route is for admin to fetch the list of users, departments, and locations.
