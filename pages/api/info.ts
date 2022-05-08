import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from "db"
import { Role, ItemSize, QuantityUnit } from "@prisma/client";

type Data = {
  departments?: object[],
  locations?: object[],
  error?: string[],
  orderTypes?: object[],
  zones: string[],
  roles: string[],
  itemSizes: string[],
  quantityUnits: string[],
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
 
    const [departments, locations, orderTypes, generalInfos] = await prisma.$transaction([
        prisma.department.findMany({
            select: {
                id: true,
                name: true,
            }
        }),
        prisma.location.findMany({
        }),
        prisma.orderType.findMany(),
        prisma.generalInfo.findMany()
    ])
    
    const data = {
        departments, 
        locations, 
        orderTypes, 
        generalInfos
    }
    return res.status(200).json(data);
}



