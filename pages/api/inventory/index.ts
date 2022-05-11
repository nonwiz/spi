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

    const [locations, user, allUsers, code_list] = await prisma.$transaction([
      prisma.location.findMany({
        include: {
          items: true,
          users: true,
          location_moving_request: {
            include: {
              item: true,
              target_location: true
            }
          }
        }
    }),
    prisma.user.findUnique({ where: { email: reqSession.user.email}, include: { department: true, location: true}}),
    prisma.user.findMany(),
    prisma.codeName.findMany()
    ])    
     const items = locations.map(item => item.items).flat()
     const relocate_requests = locations.filter(loc => loc.location_moving_request).map(loc => loc.location_moving_request);
    return res.status(200).json({ user, allUsers, items, locations, code_list, relocate_requests })
  }
  res.status(401).json({ error: true, message: "not authorized" })
}


