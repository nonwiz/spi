import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import { prisma } from "db"

type Data = {
  departments?: object[]
  locations?: object[]
  buildings?: string[]
  orderTypes?: object[]
  order_status?: string[]
  quantity_unit?: string[]
  message: string
  error?: boolean
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const reqSession = await getSession({ req });
  if (!reqSession) {
    return res.status(200).json({ 'message': "Permission denied", 'error': true })
  }

  const [departments, locations, orderTypes, generalInfos] =
    await prisma.$transaction([
      prisma.department.findMany({
        select: {
          id: true,
          name: true,
          dean_email: true,
        },
      }),
      prisma.location.findMany({
        include: {
          department: {
            select: {
              name: true,
              id: true,
              dean_email: true
            }
          }
        }
      }),
      prisma.orderType.findMany(),
      prisma.generalInfo.findMany(),
    ])
  let buildings = Array.from(new Set(locations.map(loc => loc.building)));
  let gi = generalInfos.reduce((obj, item) => {
    if (!obj[item.type]) {
      obj[item.type] = [item.name]
    } else obj[item.type] = [...obj[item.type], item.name]
    return obj
  }, {})


  const info_types = Array.from(new Set(generalInfos.map(item => item.type))).filter(info => info !== "order_status")
  const data = {
    departments,
    locations,
    buildings,
    orderTypes,
    generalInfos,
    ...gi,
    info_types,
    message: "Info fetched successfully",
    error: false,
  }
  return res.status(200).json(data);
}
