import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from "db"

type Data = {
  user?: object,
  department?: object,
  location?: object,
  error?: string,
  orderTypes?: object[]
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const reqSession = await getSession({ req });
  if (reqSession) {
    const { item_id, target_location_id } = req.body;
    const item = await prisma.item.findUnique({
      where: {
        id: Number(item_id)
      },
      include: {
        location: true
      }
    })
    const relocate = await prisma.locationMoveRequest.create({
      data: {
        item: {
          connect: {
            id: item.id
          }
        },
        previous_location: item?.location?.short_code,
        target_location: {
          connect: {
            id: Number(target_location_id)
          }
        }
      }
    })
  }
  return res.status(200).json({error: false, message: "Moving request has been sent"})
}


