import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from "db"
import { short_codes } from "./index";

type Data = {
  users?: object[],
  departments?: object[],
  locations?: object[],
  error?: string,
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const reqSession = await getSession({ req });
  if (reqSession && reqSession?.user?.role == "admin") {
    const { id, floor, room_number, department_id, building } = req.body;
    const location = await prisma.location.update({
      where: {
        id: Number(id)
      },
      data: {
        floor: Number(floor),
        room_number: room_number,
        building,
        short_code: `${short_codes[building]}${room_number}`,
        department: {
          connect: {
            id: Number(department_id)
          }
        }
      }
    })
    return res.status(200).json({ location })
  }
  res.status(500).json({ error: "not authorized" })
}

// This api route is for admin to fetch the list of users, departments, and locations.