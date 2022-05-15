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

    const [orderRequests, locations, user, allUsers, code_list] = await prisma.$transaction([
      prisma.orderRequest.findMany({
        where: {
          order_status: "purchased"
        },
        include: {
          location: true,
          order_items: true
        }
      }),
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
      prisma.user.findUnique({ where: { email: reqSession.user.email }, include: { department: true, location: true } }),
      prisma.user.findMany(),
      prisma.codeName.findMany()
    ])
    const items = locations.map(item => item.items).flat()
    const code_types = Array.from(new Set(code_list.map(item => item.codeType)))
    const relocate_requests = locations.filter(loc => loc.location_moving_request).map(loc => loc.location_moving_request);
    return res.status(200).json({ orderRequests, user, allUsers, items, locations, code_list, relocate_requests, code_types, error: false, message: "fetched inventory!" })
  }
  res.status(401).json({ error: true, message: "not authorized" })
}


