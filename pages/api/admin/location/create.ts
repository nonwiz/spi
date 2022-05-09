import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from "db"
import { short_codes } from "./index";

type Data = {
  users?: object[],
  error?: string,
}



export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const reqSession = await getSession({req});
  if (reqSession && reqSession?.user?.role == "admin") {
    const { floor, room_number, description, building } = req.body;
    const location = await prisma.location.create({
      data: {
        floor: Number(floor),
        room_number: room_number,
        description,
        building,
        short_code: `${short_codes[building]}${room_number}`
      }
    })
     return res.status(200).json({  location })
  }
  res.status(500).json({error: "not authorized"})
}


