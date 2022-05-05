import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from "db"
import { Role, Zone, ItemSize, QuantityUnit } from "@prisma/client";

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
            select: {
                id: true,
                name: true,
                current_dean_user_id: true
            }
        }),
        prisma.location.findMany({
            select: {
                id: true,
                zone: true,
                floor: true,
                room_number: true,
            }
        }),
        prisma.orderType.findMany()
    ])
    const data = {
        departments, 
        locations, 
        orderTypes, 
        zones: Object.keys(Zone), 
        roles: Object.keys(Role), 
        itemSizes: Object.keys(ItemSize), 
        quantityUnits: Object.keys(QuantityUnit)}
    return res.status(200).json(data);
}



