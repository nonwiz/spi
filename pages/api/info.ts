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
 
    const [departments, locations, orderTypes] = await prisma.$transaction([
        prisma.department.findMany({
        }),
        prisma.location.findMany({
        }),
        prisma.orderType.findMany()
    ])
    const data = {
        departments, 
        locations, 
        orderTypes, 

    }
    return res.status(200).json(data);
}



