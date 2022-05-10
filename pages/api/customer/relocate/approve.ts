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
    const { relocate_id  } = req.body;
    const relocate = await prisma.locationMoveRequest.findUnique({
      where: {
        id: Number(relocate_id)
      },
      include: {
        item?: true,
        target_location: true
      }
    })
    const item = await prisma.item.update({
      where: {
        id: relocate.item.id
      },
      data: {
        location: {
          connect: {
            id: relocate?.target_location.id
          }
        }
      }
    })
    await prisma.locationMoveRequest.delete({
      where: {
        id: Number(relocate_id)
      }
    })
   
  return res.status(200).json({error: false, message: "Moving item completed!"})
  }
  return res.status(401).json({error: true, message: "Permission denied"})
}


